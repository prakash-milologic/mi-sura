import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const invt = await tsdb.execute(
      sql.raw(`select device_code, dpy, ap 
      from invt_75fe4cee
      WHERE date_trunc('day',z_timestamp at time zone '${currentTZ}') = date_trunc('day',current_date at time zone '${currentTZ}')
      order by z_timestamp desc 
      limit 5;`)
    );

    const sungrow = await tsdb.execute(
      sql.raw(`select device_code, dpy, ap 
      from sungrow 
      WHERE date_trunc('day',z_timestamp at time zone '${currentTZ}') = date_trunc('day',current_date at time zone '${currentTZ}')
      order by z_timestamp desc 
      limit 5;`)
    );

    let result: any[] = [];

    const invtData = invt[0];
    const invtObj = {
      id: String(invtData?.device_code || "14129"),
      name: "invt",
      status: "active",
      connectedPlant: "Greenbase Solution (MIMOS)",
      production: Math.floor((Number(invtData?.ap) / 1000) * 100) / 100 || 0,
      dailyProduction: Math.floor(Number(invtData?.dpy) * 100) / 100 || 0,
    };

    const sungrowData = sungrow[0];
    const sungrowObj = {
      id: String(sungrowData?.device_code || "9731"),
      name: "sungrow",
      status: "active",
      connectedPlant: "Greenbase Solution (MIMOS)",
      production: Math.floor((Number(sungrowData?.ap) / 1000) * 100) / 100 || 0,
      dailyProduction:
        Math.floor((Number(sungrowData?.dpy) / 10) * 100) / 100 || 0,
    };

    result = [invtObj, sungrowObj];

    // result = [
    //   {
    //     id: "14129",
    //     name: "invt",
    //     status: "active",
    //     connectedPlant: "Greenbase Solution (MIMOS)",
    //     production: 0,
    //     dailyProduction: 0,
    //   },
    //   {
    //     id: "9731",
    //     name: "sungrow",
    //     status: "active",
    //     connectedPlant: "Greenbase Solution (MIMOS)",
    //     production: 0,
    //     dailyProduction: 0,
    //   },
    // ];

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
