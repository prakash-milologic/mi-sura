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
      sql`
      with month_bucket as (
        select time_bucket('1 day', z_timestamp) as mb_time,
        trunc(max(dpy), 3) as "mb_dailyYield", 
        trunc(max(tpy), 3) as "mb_totalYield"
        from invt_75fe4cee i
        where z_timestamp > now() - interval '10 years'
        group by mb_time
        order by mb_time
        ),
        year_bucket as (
            select time_bucket('1 month', mb_time) as yb_time, 
            trunc(sum("mb_dailyYield"), 3) as "yb_monthlyYield", 
            trunc(max("mb_totalYield"), 3) as "yb_totalYield"
            from month_bucket
            where mb_time > now() - interval '10 years'
            group by yb_time
            order by yb_time
        )
        select time_bucket('1 year', yb_time) as time, 
        trunc(sum("yb_monthlyYield"), 3) as "annualYield", 
        trunc(max("yb_totalYield"), 3) as "totalYield"
        from year_bucket
        where yb_time > now() - interval '10 years'
        group by time
        order by time;
      `
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
