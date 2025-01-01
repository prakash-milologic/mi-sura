import { db } from "@/db";
import { device } from "@/db/schema/device";
import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { inArray, sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

function findUniqueValues(array1: any[], array2: any[]) {
  // Find values unique to array1
  const uniqueToArr1 = array1.filter((value) => !array2.includes(value));
  // Find values unique to array2
  const uniqueToArr2 = array2.filter((value) => !array1.includes(value));

  // Combine unique values from both arrays
  const uniqueValues = [...uniqueToArr1, ...uniqueToArr2];

  return uniqueValues;
}

export async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const timeQuery = searchParams.get("time");
    // const limitQuery = searchParams.get("limit");
    // const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let data: any = [];

    data = await tsdb.execute(
      sql`select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'
        and table_name like 'invt%' or table_name like 'sungrow%';
      `
    );

    let insertedData: any = [];
    if (data?.length) {
      const devices = data?.map((d: any) => ({
        name: d?.table_name,
        serialNumber: d?.table_name,
      }));

      insertedData = await db
        .insert(device)
        .values(devices)
        .onConflictDoNothing({ target: device.serialNumber })
        .returning();
    }

    const devices = await db.query.device.findMany();

    if (devices.length > data?.length) {
      const deviceSerialNumbers = devices.map((d) => d.serialNumber);
      const tsdbTables = data?.map((d: any) => d?.table_name);
      const uniqueValues = findUniqueValues(deviceSerialNumbers, tsdbTables);

      await db.delete(device).where(inArray(device.serialNumber, uniqueValues));
    }

    // console.log("automatic_device_creation", insertedData);
    return Response.json(insertedData, {
      status: 200,
    });
  } catch (error: any) {
    console.log("error automatic_device_creation", error);
    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}
