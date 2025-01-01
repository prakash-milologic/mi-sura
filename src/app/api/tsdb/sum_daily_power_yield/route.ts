import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let data: any;
    data = await tsdb.execute(
      sql`
      select time_bucket('1 day', up_timestamp) as bucket, last(dpy, up_timestamp) as daily_power_yield
      from sungrow s
      where up_timestamp > now() - interval '1 month' and device_code='9731'
      group by bucket
      order by bucket desc;
      `
    );

    data = data.reduce(
      (acc: any, currentValue: any) => acc + currentValue.daily_power_yield,
      0
    );

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
