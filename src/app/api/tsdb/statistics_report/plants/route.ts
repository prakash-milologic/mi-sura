import { db } from "@/db";
import { device } from "@/db/schema/device";
import { plant } from "@/db/schema/plant";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { tsdb } from "@/tsdb";
import { SQL, eq, isNotNull, sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodQuery = searchParams.get("period");
    const timeQuery = searchParams.get("time") || new Date().toISOString();
    const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let data: any = [];

    const supabase = await createSupabaseServerClientReadOnly();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    const filterByRole = (role: "installer" | "user") => {
      if (!role) return undefined;

      if (role === "installer") return eq(plant.createdBy, userData.user.id);

      if (role === "user") return eq(plant.userId, userData.user.id);
    };

    const whereFilter = filterByRole(userData.user.user_metadata?.role);

    const plants = await db.query.plant.findMany({
      with: {
        devices: {
          with: { plant: true },
        },
      },
      where: whereFilter,
    });

    data = await Promise.all(
      plants.map(async (plant) => {
        const devices = plant.devices;
        const plantWithNoData = {
          currentYield: null,
          totalYield: null,
          capacity: plant.capacity,
          plantId: String(plant.id),
          plantName: plant.name,
          plantAddress: plant.address,
        };

        const getReport = (reportByPeriod: any) => {
          const report = reportByPeriod;
          if (!report) {
            return plantWithNoData;
          }
          return { ...plantWithNoData, ...report };
        };

        if (periodQuery === "day") {
          return getReport((await get_daily_report(devices, timeQuery)).at(0));
        } else if (periodQuery === "month") {
          return getReport(
            (await get_monthly_report(devices, timeQuery)).at(0)
          );
        } else if (periodQuery === "year") {
          return getReport((await get_yearly_report(devices, timeQuery)).at(0));
        } else if (periodQuery === "total") {
          return getReport((await get_total_report(devices)).at(0));
        }
      })
    );

    // get list of devices associated with any plant
    // const devices = await db.query.device.findMany({
    //   where: isNotNull(device.plantId),
    //   with: {
    //     plant: true,
    //   },
    // });

    // if (periodQuery === "day") {
    //   data = await get_daily_report(devices, timeQuery);
    // } else if (periodQuery === "month") {
    //   data = await get_monthly_report(devices, timeQuery);
    // } else if (periodQuery === "year") {
    //   data = await get_yearly_report(devices, timeQuery);
    // } else if (periodQuery === "total") {
    //   data = await get_total_report(devices);
    // }

    return Response.json(data, {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}

/**
 * return cumulative daily power yield & active power of devices of current date
 * supported with time bucket prop
 * @param devices
 * @returns
 */
async function get_daily_report(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
    plant: any;
  }[],
  timeQuery = new Date().toISOString()
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch daily power yield & active power of current date
  const dpy_ap_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const dpy_ap_addSql: SQL = sql.raw(`
      ,combined_result AS (SELECT bucket AS time, SUM(dpy) AS dpy, SUM(tpy) AS tpy
      FROM (
    `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    // append dpy & ap query of device to final sql
    dpy_ap_finalSql.append(
      sql.raw(`${devices[i].serialNumber} as (
            SELECT time_bucket('1 hour', z_timestamp) as bucket, 
            MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy, MAX(${
        deviceBrand === "sungrow" ? "tpy" : "tpg * 0.1"
      }) as tpy
            FROM ${devices[i].serialNumber}
            WHERE z_timestamp::date AT TIME ZONE '${currentTZ}' = '${timeQuery}'::date AT TIME ZONE '${currentTZ}' 
            GROUP BY bucket
          )`)
    );

    // append additional dpy & ap query of device to add sql
    dpy_ap_addSql.append(
      sql.raw(`
        SELECT * FROM ${devices[i].serialNumber} 
      `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      dpy_ap_finalSql.append(sql.raw(`,`));

      dpy_ap_addSql.append(sql.raw(`UNION ALL`));
    }
  }

  // appending last chunk of additional sql
  dpy_ap_addSql.append(
    sql.raw(`) AS combined_result
      GROUP BY time
      ORDER BY time asc
      ),
      final_result AS (
        SELECT MAX(dpy) AS "currentYield", MAX(tpy) AS "totalYield"
        FROM combined_result
      )
      SELECT * FROM final_result WHERE "currentYield" IS NOT NULL OR "totalYield" IS NOT NULL;`)
  );
  // combine add sql into final sql
  dpy_ap_finalSql.append(dpy_ap_addSql);
  // console.log("dpy_ap_finalSql", dpy_ap_finalSql.queryChunks);

  // execute final sql to get daily power yield & active power of current date
  const queryResult = await tsdb.execute(dpy_ap_finalSql);

  return queryResult;
}

/**
 * return cumulative monthly power yield of devices of current month
 * supported with time bucket prop
 * @param devices
 * @returns
 */
async function get_monthly_report(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
    plant: any;
  }[],
  timeQuery = new Date().toISOString()
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch monthly power yield of current month
  const mpy_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const mpy_addSql: SQL = sql.raw(`
      ,combined_result AS (SELECT bucket AS time, SUM(dpy) AS dpy, SUM(tpy) AS tpy
      FROM (
    `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    // append mpy query of device to final sql
    mpy_finalSql.append(
      sql.raw(`${devices[i].serialNumber} as (
            SELECT time_bucket('1 day', z_timestamp) as bucket, 
            MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy, MAX(${
        deviceBrand === "sungrow" ? "tpy" : "tpg * 0.1"
      }) as tpy
            FROM ${devices[i].serialNumber}
            WHERE date_part('month',z_timestamp AT TIME ZONE '${currentTZ}') = date_part('month', '${timeQuery}' AT TIME ZONE '${currentTZ}' )
            GROUP BY bucket
          )`)
    );

    // append additional mpy query of device to add sql
    mpy_addSql.append(
      sql.raw(`
        SELECT * FROM ${devices[i].serialNumber} 
      `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      mpy_finalSql.append(sql.raw(`,`));

      mpy_addSql.append(sql.raw(`UNION ALL`));
    }
  }

  // appending last chunk of additional sql
  mpy_addSql.append(
    sql.raw(`) AS combined_result
      WHERE date_part('month',bucket AT TIME ZONE '${currentTZ}') = date_part('month', '${timeQuery}' AT TIME ZONE '${currentTZ}' )
      GROUP BY time
      ORDER BY time asc
      ),
      final_result AS (
        SELECT MAX(dpy) AS "currentYield", MAX(tpy) AS "totalYield"
        FROM combined_result
      )
      SELECT * FROM final_result WHERE "currentYield" IS NOT NULL OR "totalYield" IS NOT NULL;`)
  );

  // combine add sql into final sql
  mpy_finalSql.append(mpy_addSql);
  // console.log("mpy_finalSql", mpy_finalSql.queryChunks);

  // execute final sql to get monthly power yield of current month
  const queryResult = await tsdb.execute(mpy_finalSql);

  return queryResult;
}

/**
 * return cumulative yearly power yield of devices of current year
 * supported with time bucket prop
 *
 * Note: need to change tpy to ypy for naming convention in the future
 * @param devices
 * @returns
 */
async function get_yearly_report(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
    plant: any;
  }[],
  timeQuery = new Date().toISOString()
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch yearly power yield of current year
  const tpy_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const tpy_addSql: SQL = sql.raw(`
      ,sum_query as (
        SELECT time_bucket('1 day', tbucket) as t2bucket, SUM(dpy) AS sum_dpy, SUM(tpy) AS sum_tpy
        FROM (
    `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    // append tpy query of device to final sql
    tpy_finalSql.append(
      sql.raw(`${devices[i].serialNumber} as (
            SELECT time_bucket('1 day', z_timestamp) as tbucket, 
            MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy, MAX(${
        deviceBrand === "sungrow" ? "tpy" : "tpg * 0.1"
      }) as tpy
            FROM ${devices[i].serialNumber}
            WHERE date_part('year',z_timestamp AT TIME ZONE '${currentTZ}') = date_part('year', '${timeQuery}' AT TIME ZONE '${currentTZ}' )
            GROUP BY tbucket
          )`)
    );

    // append additional tpy query of device to add sql
    tpy_addSql.append(
      sql.raw(`
        SELECT * FROM ${devices[i].serialNumber} 
      `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      tpy_finalSql.append(sql.raw(`,`));

      tpy_addSql.append(sql.raw(`UNION ALL`));
    }
  }

  // append last chunk of additional sql
  tpy_addSql.append(
    sql.raw(`) AS combined_result 
      GROUP BY t2bucket
      ORDER BY t2bucket)`)
  );
  // combine add sql into final sql
  tpy_finalSql.append(tpy_addSql);

  // append last chunk of final sql
  tpy_finalSql.append(
    sql.raw(`
      ,combined_result AS (SELECT date_trunc('year', t2bucket) as time, SUM(sum_dpy) AS sum_dpy, MAX(sum_tpy) AS sum_tpy
      FROM sum_query
      GROUP BY time
      ORDER BY time asc),
      final_result AS (SELECT MAX(sum_dpy) AS "currentYield", MAX(sum_tpy) AS "totalYield"
      FROM combined_result)
      SELECT * FROM final_result WHERE "currentYield" IS NOT NULL OR "totalYield" IS NOT NULL;
    `)
  );

  // console.log("tpy_finalSql", tpy_finalSql.queryChunks);

  // execute final sql to get yearly power yield of current year
  const queryResult = await tsdb.execute(tpy_finalSql);

  return queryResult;
}

/**
 * return cumulative yearly power yield of devices of current year
 * supported with time bucket prop
 *
 * Note: need to change tpy to ypy for naming convention in the future
 * @param devices
 * @returns
 */
async function get_total_report(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
    plant: any;
  }[]
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch yearly power yield of current year
  const tpy_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const tpy_addSql: SQL = sql.raw(`
      ,sum_query as (
        SELECT time_bucket('1 day', tbucket) as t2bucket, SUM(dpy) AS sum_dpy, SUM(tpy) AS sum_tpy
        FROM (
    `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    // append tpy query of device to final sql
    tpy_finalSql.append(
      sql.raw(`${devices[i].serialNumber} as (
            SELECT time_bucket('1 day', z_timestamp) as tbucket, 
            MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy, MAX(${
        deviceBrand === "sungrow" ? "tpy" : "tpg * 0.1"
      }) as tpy
            FROM ${devices[i].serialNumber}
            WHERE z_timestamp AT TIME ZONE '${currentTZ}' > NOW() AT TIME ZONE '${currentTZ}' - INTERVAL '10 years'
            GROUP BY tbucket
          )`)
    );

    // append additional tpy query of device to add sql
    tpy_addSql.append(
      sql.raw(`
        SELECT * FROM ${devices[i].serialNumber} 
      `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      tpy_finalSql.append(sql.raw(`,`));

      tpy_addSql.append(sql.raw(`UNION ALL`));
    }
  }

  // append last chunk of additional sql
  tpy_addSql.append(
    sql.raw(`) AS combined_result 
      GROUP BY t2bucket
      ORDER BY t2bucket)`)
  );
  // combine add sql into final sql
  tpy_finalSql.append(tpy_addSql);

  // append last chunk of final sql
  tpy_finalSql.append(
    sql.raw(`
      ,combined_result AS (SELECT date_trunc('year', t2bucket) as time, SUM(sum_dpy) AS sum_dpy, MAX(sum_tpy) AS sum_tpy
      FROM sum_query
      GROUP BY time
      ORDER BY time asc),
      final_result AS (SELECT MAX(sum_dpy) AS "currentYield", MAX(sum_tpy) AS "totalYield"
      FROM combined_result)
      SELECT * FROM final_result WHERE "currentYield" IS NOT NULL OR "totalYield" IS NOT NULL;
    `)
  );

  // console.log("tpy_finalSql", tpy_finalSql.queryChunks);

  // execute final sql to get yearly power yield of current year
  const queryResult = await tsdb.execute(tpy_finalSql);

  return queryResult;
}
