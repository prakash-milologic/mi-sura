import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id: device_id } = params;

  try {
    let data: any[] = [];

    if (device_id === "invt") {
      data = await tsdb.execute(
        sql`
        select z_timestamp, dpy, ap, device_code::text
        from invt_75fe4cee
        where date_trunc('day',z_timestamp at time zone ${currentTZ}) = date_trunc('day',current_date at time zone ${currentTZ})
        order by z_timestamp desc
        limit 5;
        `
      );
    } else if (device_id === "sungrow") {
      data = await tsdb.execute(
        sql`
        select z_timestamp, dpy, ap, m1v, m1c, m2v, m2c, device_code::text
        from sungrow
        where date_trunc('day',z_timestamp at time zone ${currentTZ}) = date_trunc('day',current_date at time zone ${currentTZ})
        order by z_timestamp desc
        limit 5;
        `
      );
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

// data = await tsdb.execute(
//     sql`
//           WITH invt_query AS (
//             SELECT time_bucket('5 minutes', z_timestamp) AS tbucket, MAX(dpy) AS dpy, MAX(tpy) AS tpy
//             FROM invt
//             WHERE date_trunc('day',z_timestamp at time zone ${currentTZ}) = date_trunc('day',${timeQuery} at time zone ${currentTZ})
//             GROUP BY tbucket
//           ),
//           sungrow_query AS (
//               SELECT time_bucket('5 minutes', z_timestamp) AS tbucket, MAX(dpy) AS dpy, MAX(tpy) AS tpy
//               FROM sungrow
//               WHERE date_trunc('day',z_timestamp at time zone ${currentTZ}) = date_trunc('day',${timeQuery} at time zone ${currentTZ})
//               GROUP BY tbucket
//           ),
//           combined_result as (
//               SELECT time_bucket('5 minutes', tbucket) as bucket, SUM(dpy) AS dpy, SUM(tpy) AS tpy
//               FROM (
//                  SELECT * FROM invt_query
//                  UNION ALL
//                  SELECT * FROM sungrow_query
//               ) AS combined_result
//               GROUP BY bucket
//               ORDER BY bucket
//           ),
//           result as (
//             select MAX(dpy) as "currentYield", MAX(tpy) as "totalYield"
//             from combined_result
//           )
//           select * from result where "currentYield" is not null or "totalYield" is not null;
//         `
//   );
