import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { device } from "@/db/schema/device";
import { isNotNull } from "drizzle-orm";
import {
  get_dpy_ap_queryResult,
  get_mpy_queryResult,
  get_tpy_queryResult,
} from "../_utils";
import { type NextRequest } from "next/server";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { plant } from "@/db/schema/plant";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get("period");

  try {
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

    // get plant list including respective devices
    const plants = await db.query.plant.findMany({
      with: {
        devices: true,
      },
      where: whereFilter,
    });

    // get list of devices respective to the plants
    const devices = plants.flatMap((plant) => plant.devices);

    let data: any = [];

    if (devices.length) {
      if (period === "live") {
        data = await getLiveRevenueStatistics(devices);
      } else if (period === "daily") {
        data = await getDailyRevenueStatistics(devices);
      } else if (period === "monthly") {
        data = await getMonthlyRevenueStatistics(devices);
      } else if (period === "yearly") {
        data = await getYearlyRevenueStatistics(devices);
      }
    }

    return Response.json(data, {
      status: 200,
    });
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}

async function getLiveRevenueStatistics(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  const timeBucket = "5 minutes";

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const query = sql.raw(`WITH `);

  const combinedQuery = sql.raw(`
          SELECT bucket, SUM(dpy) AS dpy
          FROM (
    `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    query.append(
      sql.raw(`${devices[i].serialNumber} as (
                      SELECT time_bucket('${timeBucket}', z_timestamp) as bucket, 
                      MAX(dpy ${
                        deviceBrand === "sungrow" ? "* 0.1" : ""
                      }) as dpy
                      FROM ${devices[i].serialNumber}
                      WHERE time_bucket('${timeBucket}', z_timestamp)::DATE AT TIME ZONE '${currentTZ}' = CURRENT_DATE AT TIME ZONE '${currentTZ}'
                      GROUP BY bucket
                    )`)
    );

    combinedQuery.append(
      sql.raw(`
                  SELECT * FROM ${devices[i].serialNumber} 
                `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      query.append(sql.raw(`,`));
      combinedQuery.append(sql.raw(`UNION ALL`));
    }
  }

  combinedQuery.append(
    sql.raw(`) AS combined_result 
        GROUP BY bucket
        ORDER BY bucket desc;`)
  );

  query.append(combinedQuery);

  const queryResult = await tsdb.execute(query);

  return queryResult;
}

async function getDailyRevenueStatistics(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  const timeBucket = "1 day";

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const query = sql.raw(`WITH `);

  const combinedQuery = sql.raw(`
        SELECT bucket, SUM(dpy) AS dpy
        FROM (
  `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    query.append(
      sql.raw(`${devices[i].serialNumber} as (
                    SELECT time_bucket('${timeBucket}', z_timestamp) as bucket, 
                    MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy
                    FROM ${devices[i].serialNumber}
                    WHERE DATE_PART('month', time_bucket('${timeBucket}', z_timestamp) AT TIME ZONE '${currentTZ}') = DATE_PART('month', CURRENT_DATE AT TIME ZONE '${currentTZ}')
                    AND DATE_PART('year', time_bucket('${timeBucket}', z_timestamp) AT TIME ZONE '${currentTZ}') = DATE_PART('year', CURRENT_DATE AT TIME ZONE '${currentTZ}')
                    GROUP BY bucket
                  )`)
    );

    combinedQuery.append(
      sql.raw(`
                SELECT * FROM ${devices[i].serialNumber} 
              `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      query.append(sql.raw(`,`));
      combinedQuery.append(sql.raw(`UNION ALL`));
    }
  }

  combinedQuery.append(
    sql.raw(`) AS combined_result GROUP BY bucket
        ORDER BY bucket desc;`)
  );

  query.append(combinedQuery);

  const queryResult = await tsdb.execute(query);

  return queryResult;
}

async function getMonthlyRevenueStatistics(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  const timeBucket = "1 day";

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const query = sql.raw(`WITH `);

  const combinedQuery = sql.raw(`
        SELECT DATE_TRUNC('month', tbucket) as bucket, SUM(dpy) AS mpy
        FROM (
      `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    query.append(
      sql.raw(`${devices[i].serialNumber} as (
              SELECT time_bucket('${timeBucket}', z_timestamp) as tbucket, 
              MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy
              FROM ${devices[i].serialNumber}
              WHERE DATE_PART('year', time_bucket('${timeBucket}', z_timestamp) AT TIME ZONE '${currentTZ}') = DATE_PART('year', CURRENT_DATE AT TIME ZONE '${currentTZ}' )
              GROUP BY tbucket
            )`)
    );

    combinedQuery.append(
      sql.raw(`
          SELECT * FROM ${devices[i].serialNumber} 
        `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      query.append(sql.raw(`,`));
      combinedQuery.append(sql.raw(`UNION ALL`));
    }
  }

  combinedQuery.append(
    sql.raw(`) AS combined_result 
      GROUP BY bucket
      ORDER BY bucket desc;`)
  );

  query.append(combinedQuery);

  const queryResult = await tsdb.execute(query);

  return queryResult;
}

async function getYearlyRevenueStatistics(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  const timeBucket = "1 day";

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const query = sql.raw(`WITH `);

  const combinedQuery = sql.raw(`
          SELECT DATE_TRUNC('year', tbucket) as bucket, SUM(dpy) AS tpy
          FROM (
        `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    query.append(
      sql.raw(`${devices[i].serialNumber} as (
                SELECT time_bucket('${timeBucket}', z_timestamp) as tbucket, 
                MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy
                FROM ${devices[i].serialNumber}
                WHERE DATE_PART('year', time_bucket('${timeBucket}', z_timestamp) AT TIME ZONE '${currentTZ}' ) 
                BETWEEN DATE_PART('year', CURRENT_DATE AT TIME ZONE'${currentTZ}' ) - 3 
                AND DATE_PART('year', CURRENT_DATE AT TIME ZONE'${currentTZ}' )
                GROUP BY tbucket
              )`)
    );

    combinedQuery.append(
      sql.raw(`
            SELECT * FROM ${devices[i].serialNumber} 
          `)
    );

    // add required syntax & functions to the sql if there is still a device to query
    if (i !== devices.length - 1) {
      query.append(sql.raw(`,`));
      combinedQuery.append(sql.raw(`UNION ALL`));
    }
  }

  combinedQuery.append(
    sql.raw(`) AS combined_result 
        GROUP BY bucket
        ORDER BY bucket desc;`)
  );

  query.append(combinedQuery);

  const queryResult = await tsdb.execute(query);

  return queryResult;
}
