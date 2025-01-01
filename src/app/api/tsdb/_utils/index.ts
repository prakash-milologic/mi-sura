import { tsdb } from "@/tsdb";
import { SQL, sql } from "drizzle-orm";

export async function get_tpy_carbon_footprint(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const query = sql.raw(`WITH `);

  const combinedQuery = sql.raw(`SELECT SUM(tpy) AS tpy FROM (`);

  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    query.append(
      sql.raw(
        `${devices[i].serialNumber} as (
        SELECT MAX(${deviceBrand === "sungrow" ? "tpy" : "tpg * 0.1"}) AS tpy
        FROM ${devices[i].serialNumber}
        WHERE date_part('month',z_timestamp AT TIME ZONE '${currentTZ}') = date_part('month','2024-06-23T00:00:00.000Z' AT TIME ZONE '${currentTZ}' )
      )
    `
      )
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

  combinedQuery.append(sql.raw(`) AS combined_result`));

  query.append(combinedQuery);

  const result = await tsdb.execute(query);
  return result;
}

/**
 * return alarms (if exist) of provided device
 * @param deviceSN string. Ex: invt_123
 * @param time UTC. Ex: 2024-06-02T06:14:10Z
 * @param limit number. Ex: 5
 * @returns
 */
export async function getAlarms(
  deviceSN: string,
  time: string,
  limit?: number
) {
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let data: any[] = [];

  // get device brand
  const deviceBrand = deviceSN.split("_")[0];

  // check if alarm column exist
  const checkColumnAlarm = await tsdb.execute(
    sql.raw(`
      SELECT true as exists
      FROM information_schema.columns
      WHERE table_name='${deviceSN}' AND column_name='alarm';
      `)
  );

  // if alarm column exist proceed to query the alarm list
  if (checkColumnAlarm[0]?.exists) {
    data = await tsdb.execute(
      sql.raw(`SELECT z_timestamp, alarm
          FROM ${deviceSN}
          WHERE date_trunc('day',z_timestamp AT TIME ZONE '${currentTZ}') = date_trunc('day','${time}' at time zone '${currentTZ}')
          AND alarm != 'No Alarm'
          ORDER BY z_timestamp DESC
           ${limit ? "LIMIT " + limit : ""};
        `)
    );
  }

  return data;
}

/**
 * return cumulative daily power yield & active power of devices of current date
 * supported with time bucket prop
 * @param devices
 * @returns
 */
export async function get_dpy_ap_queryResult(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[],
  timeBucket = "5 minutes"
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch daily power yield & active power of current date
  const dpy_ap_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const dpy_ap_addSql: SQL = sql.raw(`
          SELECT bucket, SUM(dpy) AS dpy, SUM(ap) AS ap
          FROM (
    `);

  // build sql dynamically based on available devices
  for (let i = 0; i < devices.length; i++) {
    // get device brand
    const deviceBrand = devices[i].serialNumber.split("_")[0];

    // append dpy & ap query of device to final sql
    dpy_ap_finalSql.append(
      sql.raw(`${devices[i].serialNumber} as (
            SELECT time_bucket('${timeBucket}', z_timestamp) as bucket, 
            MAX(dpy ${
              deviceBrand === "sungrow" ? "* 0.1" : ""
            }) as dpy, MAX(ap) as ap
            FROM ${devices[i].serialNumber}
            WHERE z_timestamp::date AT TIME ZONE '${currentTZ}' = current_date AT TIME ZONE '${currentTZ}' 
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
    ORDER BY bucket desc;`)
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
export async function get_mpy_queryResult(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch monthly power yield of current month
  const mpy_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const mpy_addSql: SQL = sql.raw(`
      SELECT bucket, SUM(dpy) AS mpy
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
            MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy
            FROM ${devices[i].serialNumber}
            WHERE date_part('month',z_timestamp AT TIME ZONE '${currentTZ}') = date_part('month',CURRENT_DATE AT TIME ZONE '${currentTZ}' )
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
      WHERE date_part('month',bucket AT TIME ZONE '${currentTZ}') = date_part('month',CURRENT_DATE AT TIME ZONE '${currentTZ}' )
      GROUP BY bucket
      ORDER BY bucket desc;`)
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
export async function get_tpy_queryResult(
  devices: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    serialNumber: string;
    plantId: number | null;
  }[]
) {
  if (!devices.length) return [];

  // get locale time zone. Ex: 'Australia/Sydney'
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // init final sql to fetch yearly power yield of current year
  const tpy_finalSql: SQL = sql.raw(`WITH `);

  // init additional sql to comply final sql
  const tpy_addSql: SQL = sql.raw(`
      ,mpy_query as (
        SELECT date_trunc('month', tbucket) as t2bucket, SUM(dpy) AS mpy
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
            MAX(dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""}) as dpy
            FROM ${devices[i].serialNumber}
            WHERE date_part('month',z_timestamp AT TIME ZONE '${currentTZ}') = date_part('month',CURRENT_DATE AT TIME ZONE '${currentTZ}' )
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
      SELECT t2bucket as bucket, SUM(mpy) AS tpy
      FROM mpy_query AS combined_result
      WHERE date_part('year',t2bucket at time zone '${currentTZ}' ) = date_part('year',CURRENT_DATE at time zone '${currentTZ}' )
      GROUP BY bucket
      ORDER BY bucket desc;
    `)
  );

  // console.log("tpy_finalSql", tpy_finalSql.queryChunks);

  // execute final sql to get yearly power yield of current year
  const queryResult = await tsdb.execute(tpy_finalSql);

  return queryResult;
}

// old tpy query result (static devices)
// const tpy = await tsdb.execute(
//   sql.raw(`
//   WITH invt_query AS (
//     SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy) AS dpy
//     FROM invt_75fe4cee
//     WHERE date_part('month',z_timestamp at time zone '${currentTZ}') = date_part('month',CURRENT_DATE at time zone '${currentTZ}' )
//     GROUP BY tbucket
//   ),
//   sungrow_query AS (
//       SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy / 10) AS dpy
//       FROM sungrow
//       WHERE date_part('month',z_timestamp at time zone '${currentTZ}' ) = date_part('month',CURRENT_DATE at time zone '${currentTZ}' )
//       GROUP BY tbucket
//   ),
//   mpy_query as (
//     SELECT time_bucket('1 month', tbucket) as t2bucket, SUM(dpy) AS mpy
//     FROM (
//         SELECT * FROM invt_query
//         UNION ALL
//         SELECT * FROM sungrow_query
//     ) AS combined_result
//     GROUP BY t2bucket
//     ORDER BY t2bucket
//   )
//   SELECT time_bucket('1 year', t2bucket) as bucket, SUM(mpy) AS tpy
//   FROM mpy_query AS combined_result
//   GROUP BY bucket
//   ORDER BY bucket desc;`)
// );

// old mpy query result (static devices)
// const mpy = await tsdb.execute(
//   sql.raw(`
//   WITH invt_query AS (
//     SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy) AS dpy
//     FROM invt_75fe4cee
//     WHERE date_part('month',z_timestamp at time zone '${currentTZ}') = date_part('month',CURRENT_DATE at time zone '${currentTZ}' )
//     GROUP BY tbucket
//   ),
//   sungrow_query AS (
//       SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy / 10) AS dpy
//       FROM sungrow
//       WHERE date_part('month',z_timestamp at time zone '${currentTZ}' ) = date_part('month',CURRENT_DATE at time zone '${currentTZ}' )
//       GROUP BY tbucket
//   )
//   SELECT time_bucket('1 month', tbucket) as bucket, SUM(dpy) AS mpy
//   FROM (
//       SELECT * FROM invt_query
//       UNION ALL
//       SELECT * FROM sungrow_query
//   ) AS combined_result
//   GROUP BY bucket
//   ORDER BY bucket desc;`)
// );

// old dpy_ap query result (static devices)
// const dpy_ap = await tsdb.execute(
//   sql.raw(`
//     WITH invt_query AS (
//       SELECT time_bucket('5 minutes', z_timestamp) AS bucket, MAX(dpy) AS dpy, MAX(ap) AS ap
//       FROM invt_75fe4cee
//       WHERE z_timestamp::date at time zone '${currentTZ}' = current_date at time zone '${currentTZ}'
//       GROUP BY bucket
//     ),
//     sungrow_query AS (
//         SELECT time_bucket('5 minutes', z_timestamp) AS bucket, MAX(dpy / 10) AS dpy, MAX(ap) AS ap
//         FROM sungrow
//         WHERE z_timestamp::date at time zone '${currentTZ}' = current_date at time zone '${currentTZ}'
//         GROUP BY bucket
//     )
//     SELECT bucket, SUM(dpy) AS dpy, SUM(ap) AS ap
//     FROM (
//         SELECT * FROM invt_query
//         UNION ALL
//         SELECT * FROM sungrow_query
//     ) AS combined_result
//     GROUP BY bucket
//     ORDER BY bucket desc;`)
// );
// console.log("dpy_ap", dpy_ap);
