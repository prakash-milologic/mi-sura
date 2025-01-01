import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeQuery = searchParams.get("time");
    const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let data = [];
    // console.log("timeQuery", timeQuery);
    data = await tsdb.execute(
      sql`select time_bucket('1 hour', z_timestamp) as time,
      trunc(max(dpy), 3) as "dailyYield", 
      trunc(max(tpy), 3) as "totalYield"
      from invt_75fe4cee i
      where z_timestamp > now() - interval '1 day' 
      and date_trunc('day', z_timestamp at time zone ${currentTZ}) 
      = date_trunc('day', ${timeQuery}::timestamp)
      group by time
      order by time;`
    );

    if (data.length) {
      data = data.map((d) => ({
        ...d,
        id: d?.time,
        name: "Greenbase Solution (MIMOS)", // need to change to dynamic,
      }));
    }

    // const test = await tsdb.execute(sql`show timezone;`);

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
