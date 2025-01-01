import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const data = await tsdb.execute(
      sql`select time_bucket('1 day', to_timestamp(p_timestamp, 'dd/MM/yyyy HH24:mi:ss')) as bucket, last(dpy, to_timestamp(p_timestamp, 'dd/MM/yyyy HH24:mi:ss')) as daily_power_yield
      from invt_75fe4cee i
      where to_timestamp(p_timestamp, 'dd/MM/yyyy HH24:mi:ss') > now() - interval '1 month' and device_code='14129'
      group by bucket
      order by bucket desc`
    );

    // filter only data of current month based on local system date
    const result = data.filter((d: any) => {
      const bucketMonth = new Date(d.bucket).getMonth() + 1;
      const currentMonth = new Date().getMonth() + 1;
      if (bucketMonth === currentMonth) {
        return { ...d };
      }
    });

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
