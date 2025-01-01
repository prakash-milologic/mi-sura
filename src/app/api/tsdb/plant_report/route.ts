import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodQuery = searchParams.get("period");
    const timeQuery = searchParams.get("time");
    const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let data: any = [];

    if (periodQuery === "day") {
      data = await tsdb.execute(
        sql`
            WITH invt_query AS (
            SELECT time_bucket('1 hour', z_timestamp) AS tbucket, MAX(dpy) AS dpy, MAX(tpg * 0.1) AS tpy
            FROM invt_75fe4cee
            WHERE date_trunc('day',z_timestamp at time zone ${currentTZ}) = date_trunc('day',${timeQuery} at time zone ${currentTZ})
            GROUP BY tbucket
            ),
            sungrow_query AS (
                SELECT time_bucket('1 hour', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy, MAX(tpy) AS tpy
                FROM sungrow
                WHERE date_trunc('day',z_timestamp at time zone ${currentTZ}) = date_trunc('day',${timeQuery} at time zone ${currentTZ})
                GROUP BY tbucket
            )
            SELECT time_bucket('1 hour', tbucket) as time, SUM(dpy) AS "currentYield", SUM(tpy) AS "totalYield"
            FROM (
                SELECT * FROM invt_query
                UNION ALL
                SELECT * FROM sungrow_query
            ) AS combined_result
            GROUP BY time
            ORDER BY time;
            `
      );
    } else if (periodQuery === "month") {
      data = await tsdb.execute(
        sql`
            WITH invt_query AS (
            SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy) AS dpy, MAX(tpg * 0.1) AS tpy
            FROM invt_75fe4cee
            WHERE date_trunc('month',z_timestamp at time zone ${currentTZ}) = date_trunc('month',${timeQuery} at time zone ${currentTZ})
            GROUP BY tbucket
            ),
            sungrow_query AS (
                SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy, MAX(tpy) AS tpy
                FROM sungrow
                WHERE date_trunc('month',z_timestamp at time zone ${currentTZ}) = date_trunc('month',${timeQuery} at time zone ${currentTZ})
                GROUP BY tbucket
            )
            SELECT time_bucket('1 day', tbucket) as time, SUM(dpy) AS "currentYield", SUM(tpy) AS "totalYield"
            FROM (
                SELECT * FROM invt_query
                UNION ALL
                SELECT * FROM sungrow_query
            ) AS combined_result
            GROUP BY time
            ORDER BY time;
            `
      );
    } else if (periodQuery === "year") {
      data = await tsdb.execute(
        sql`
            WITH invt_query AS (
            SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy) AS dpy, MAX(tpg * 0.1) AS tpy
            FROM invt_75fe4cee
            WHERE date_trunc('year',z_timestamp at time zone ${currentTZ}) = date_trunc('year',${timeQuery} at time zone ${currentTZ})
            GROUP BY tbucket
            ),
            sungrow_query AS (
                SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy, MAX(tpy) AS tpy
                FROM sungrow
                WHERE date_trunc('year',z_timestamp at time zone ${currentTZ}) = date_trunc('year',${timeQuery} at time zone ${currentTZ})
                GROUP BY tbucket
            ),
            sum_query AS (
                SELECT time_bucket('1 day', tbucket) as t2bucket, SUM(dpy) AS sum_dpy, SUM(tpy) AS sum_tpy
                FROM (
                    SELECT * FROM invt_query
                    UNION ALL
                    SELECT * FROM sungrow_query
                ) AS combined_result
                GROUP BY t2bucket
            )
            SELECT date_trunc('month', t2bucket) as time, SUM(sum_dpy) AS "currentYield", MAX(sum_tpy) AS "totalYield"
            FROM sum_query
            GROUP BY time
            ORDER BY time;
            `
      );

      //   data = data?.map((d: any) => ({
      //     ...d,
      //     currentYield: String(
      //       Math.floor(
      //         Number(d?.currentYield * new Date().getMonth() + 1 / 0.3) * 10
      //       ) / 10
      //     ),
      //   }));
    } else if (periodQuery === "total") {
      data = await tsdb.execute(
        sql`
            WITH invt_query AS (
            SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy) AS dpy, MAX(tpg * 0.1) AS tpy
            FROM invt_75fe4cee
            WHERE z_timestamp at time zone ${currentTZ} > now() at time zone ${currentTZ} - interval '10 years'
            GROUP BY tbucket
            ),
            sungrow_query AS (
                SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy, MAX(tpy) AS tpy
                FROM sungrow
                WHERE z_timestamp at time zone ${currentTZ} > now() at time zone ${currentTZ} - interval '10 years'
                GROUP BY tbucket
            ),
            sum_query AS (
                SELECT time_bucket('1 day', tbucket) as t2bucket, SUM(dpy) AS sum_dpy, SUM(tpy) AS sum_tpy
                FROM (
                    SELECT * FROM invt_query
                    UNION ALL
                    SELECT * FROM sungrow_query
                ) AS combined_result
                GROUP BY t2bucket
            )
            SELECT date_trunc('year', t2bucket) as time, SUM(sum_dpy) AS "currentYield", MAX(sum_tpy) AS "totalYield"
            FROM sum_query
            GROUP BY time
            ORDER BY time;
            `
      );
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
