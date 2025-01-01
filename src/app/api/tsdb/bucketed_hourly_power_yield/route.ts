import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const data = await tsdb.execute(
      sql`select time_bucket('1 hour', to_timestamp(p_timestamp, 'dd/MM/yyyy HH24:mi:ss')::timestamp) as bucket, last(dpy, to_timestamp(p_timestamp, 'dd/MM/yyyy HH24:mi:ss')::timestamp) as hourly_power_yield
      from invt_75fe4cee i
      where to_timestamp(p_timestamp, 'dd/MM/yyyy HH24:mi:ss')::timestamp > now() - interval '1 day' and device_code='14129'
      group by bucket
      order by bucket desc`
    );

    // filter only data of current date based on local system date
    const result = data.filter((d: any) => {
      const bucketDate = new Date(d.bucket).getDate();
      const currentDate = new Date().getDate();
      if (bucketDate === currentDate) {
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
