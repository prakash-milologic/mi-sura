import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // const data = await tsdb.execute(
    //   sql`select * from sungrow
    //   where up_timestamp > now() - interval '1 day' and device_code='9731'
    //   order by up_timestamp desc
    //   limit 5`
    // );

    const data = await tsdb.execute(
      sql.raw(`
        WITH invt_query AS (
          SELECT time_bucket('1 minute', z_timestamp) AS bucket, MAX(dpy) AS dpy, MAX(ap) AS ap
          FROM invt_75fe4cee
          WHERE z_timestamp::date at time zone '${currentTZ}' = current_date at time zone '${currentTZ}'
          GROUP BY bucket
        ),
        sungrow_query AS (
            SELECT time_bucket('1 minute', z_timestamp) AS bucket, MAX(dpy * 0.1) AS dpy, MAX(ap) AS ap
            FROM sungrow
            WHERE z_timestamp::date at time zone '${currentTZ}' = current_date at time zone '${currentTZ}'
            GROUP BY bucket
        )
        SELECT bucket, SUM(dpy) AS dpy, SUM(ap) AS ap
        FROM (
            SELECT * FROM invt_query
            UNION ALL
            SELECT * FROM sungrow_query
        ) AS combined_result
        GROUP BY bucket
        ORDER BY bucket desc;`)
    );

    let result: any[] = [];

    if (data.length) {
      const plantData = data[0];
      // const isAlert = plantData.alarm === "No Alarm" ? false : true;
      const capacity = 29.45;
      const production = Math.floor((Number(plantData.ap) / 1000) * 100) / 100;
      const power = Math.floor((production / capacity) * 100) / 100;
      const dailyProduction = Math.floor(Number(plantData.dpy) * 1000) / 1000;

      result = [
        {
          id: "plant1",
          name: "Greenbase Solution (MIMOS)",
          isAlert: null,
          capacity,
          production,
          power,
          trend: "UP",
          dailyProduction,
        },
      ];
    } else {
      result = [
        {
          id: "plant1",
          name: "Plant 2",
          isAlert: 0,
          capacity: 0,
          production: 0,
          power: 0,
          trend: "UP",
          dailyProduction: 0,
        },
      ];
    }

    return Response.json(result, {
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
