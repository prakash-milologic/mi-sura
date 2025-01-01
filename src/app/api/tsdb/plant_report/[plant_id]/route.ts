import { tsdb } from "@/tsdb";
import { SQL, eq, isNotNull, sql } from "drizzle-orm";
import { get_dpy_ap_queryResult, get_mpy_queryResult } from "../../_utils";
import { db } from "@/db";
import { device } from "@/db/schema/device";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { plant_id: string } }
) {
  try {
    const plantId = Number(params.plant_id);
    const { searchParams } = new URL(request.url);
    const periodQuery = searchParams.get("period");
    const timeQuery = searchParams.get("time") || new Date().toISOString();
    const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let data: any = [];

    // get list of devices associated with plant_id
    const devices = await db.query.device.findMany({
      where: eq(device.plantId, plantId),
      with: {
        plant: true,
      },
    });

    if (periodQuery === "day") {
      data = await get_daily_report(devices, timeQuery);
    } else if (periodQuery === "month") {
      data = await get_monthly_report(devices, timeQuery);
    } else if (periodQuery === "year") {
      data = await get_yearly_report(devices, timeQuery);
    } else if (periodQuery === "total") {
      data = await get_total_report(devices);
    }

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
          SELECT bucket as time, SUM(dpy) AS "currentYield", SUM(tpy) AS "totalYield", '${devices[0].plant?.name}' AS "plantName"
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
    sql.raw(`) AS combined_result GROUP BY bucket
    ORDER BY time asc;`)
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
      SELECT bucket as time, SUM(dpy) AS "currentYield", SUM(tpy) AS "totalYield", '${devices[0].plant?.name}' as "plantName"
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
      ORDER BY time asc;`)
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
      SELECT date_trunc('month', t2bucket) as time, SUM(sum_dpy) AS "currentYield", MAX(sum_tpy) AS "totalYield", '${devices[0].plant?.name}' AS "plantName"
      FROM sum_query
      GROUP BY time
      ORDER BY time asc;
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
      SELECT date_trunc('year', t2bucket) as time, SUM(sum_dpy) AS "currentYield", MAX(sum_tpy) AS "totalYield", '${devices[0].plant?.name}' AS "plantName"
      FROM sum_query
      GROUP BY time
      ORDER BY time asc;
    `)
  );

  // console.log("tpy_finalSql", tpy_finalSql.queryChunks);

  // execute final sql to get yearly power yield of current year
  const queryResult = await tsdb.execute(tpy_finalSql);

  return queryResult;
}
