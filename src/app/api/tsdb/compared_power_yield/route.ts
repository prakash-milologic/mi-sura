import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get("period");
  let timeBucket = "1 day";
  let field = "dpy";
  let interval = "date_part('month', up_timestamp) = date_part('month', now())";

  switch (period) {
    case "monthly":
      timeBucket = "1 month";
      field = "mpy";
      interval = "date_part('year', up_timestamp) = date_part('year', now())";
      break;
    case "yearly":
      timeBucket = "1 year";
      field = "tpy";
      interval = "up_timestamp > now() - interval '5 years'";
      break;
    default:
      break;
  }

  try {
    let data: any = [];
    if (period === "daily") {
      data = await tsdb.execute(
        sql.raw(`
          WITH invt_query AS (
            SELECT time_bucket('5 minutes', z_timestamp) AS tbucket, MAX(dpy) AS dpy
            FROM invt_75fe4cee
            WHERE z_timestamp::date at time zone '${currentTZ}' = current_date at time zone '${currentTZ}'
            GROUP BY tbucket
          ),
          sungrow_query AS (
              SELECT time_bucket('5 minutes', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy
              FROM sungrow
              WHERE z_timestamp::date at time zone '${currentTZ}' = current_date at time zone '${currentTZ}'
              GROUP BY tbucket
          )
          SELECT time_bucket('1 day', tbucket) AS bucket, AVG(dpy) as dpy
          FROM (
              SELECT * FROM invt_query
              UNION ALL
              SELECT * FROM sungrow_query
          ) AS combined_result
          GROUP BY bucket
          ORDER BY bucket;`)
      );
    } else if (period === "monthly") {
      data = await tsdb.execute(
        sql.raw(`
        WITH invt_query AS (
          SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy) AS dpy
          FROM invt_75fe4cee
          WHERE date_part('month',z_timestamp at time zone '${currentTZ}') = date_part('month',CURRENT_DATE at time zone '${currentTZ}' )
          GROUP BY tbucket
        ),
        sungrow_query AS (
            SELECT time_bucket('1 day', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy
            FROM sungrow
            WHERE date_part('month',z_timestamp at time zone '${currentTZ}' ) = date_part('month',CURRENT_DATE at time zone '${currentTZ}' )
            GROUP BY tbucket
        )
        SELECT time_bucket('1 month', tbucket) AS bucket, AVG(dpy) as mpy
        FROM (
            SELECT * FROM invt_query
            UNION ALL
            SELECT * FROM sungrow_query
        ) AS combined_result
        GROUP BY bucket
        ORDER BY bucket;`)
      );
    } else if (period === "yearly") {
      data = await tsdb.execute(
        sql.raw(`
        WITH invt_query AS (
          SELECT time_bucket('1 month', z_timestamp) AS tbucket, MAX(dpy) AS dpy
          FROM invt_75fe4cee
          WHERE date_part('year',z_timestamp at time zone '${currentTZ}') = date_part('year',CURRENT_DATE at time zone '${currentTZ}')
          GROUP BY tbucket
        ),
        sungrow_query AS (
            SELECT time_bucket('1 month', z_timestamp) AS tbucket, MAX(dpy * 0.1) AS dpy
            FROM sungrow
            WHERE date_part('year',z_timestamp at time zone '${currentTZ}') = date_part('year',CURRENT_DATE at time zone '${currentTZ}')
            GROUP BY tbucket
        )
        SELECT time_bucket('1 year', tbucket) AS bucket, AVG(dpy) as tpy
        FROM (
            SELECT * FROM invt_query
            UNION ALL
            SELECT * FROM sungrow_query
        ) AS combined_result
        GROUP BY bucket
        ORDER BY bucket;`)
      );
    }

    // const data = await tsdb.execute(
    //   sql.raw(`select time_bucket('${timeBucket}', up_timestamp) as bucket, avg(${field}) as ${field} from sungrow
    //   where ${interval} and device_code='9731'
    //   group by bucket
    //   order by bucket desc
    //   limit 2
    //   `)
    // );

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
