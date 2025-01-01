import { db } from "@/db";
import { device } from "@/db/schema/device";
import { workOrder } from "@/db/schema/work-order";
import { tsdb } from "@/tsdb";
import { desc, isNotNull, sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeQuery = searchParams.get("time");
    const limitQuery = searchParams.get("limit");
    const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // get list of devices that have plant_id
    const devices = await db.query.device.findMany({
      with: {
        plant: true,
      },
      where: isNotNull(device.plantId),
    });

    const unFlattenAlarms = await Promise.all(
      devices.map(async (device) => {
        // get device brand
        const deviceBrand = device.serialNumber.split("_")[0];

        let data: any[] = [];

        // check if alarm column exist
        const checkColumnAlarm = await tsdb.execute(
          sql.raw(`
            SELECT true as exists
            FROM information_schema.columns
            WHERE table_name='${device.serialNumber}' AND column_name='alarm';
            `)
        );

        // if alarm column exist proceed to query the alarm list
        if (checkColumnAlarm[0]?.exists) {
          data = await tsdb.execute(
            sql.raw(`
        SELECT z_timestamp, alarm
        FROM ${device.serialNumber}
        WHERE date_trunc('day',z_timestamp AT TIME ZONE '${currentTZ}') = date_trunc('day','${timeQuery}' AT TIME ZONE '${currentTZ}')
        AND alarm != 'No Alarm'
        ORDER BY z_timestamp DESC
        LIMIT ${limitQuery};
        `)
          );

          data = data.map((d) => ({
            ...d,
            deviceId: device.id,
            deviceName: device.name,
            plantName: device.plant?.name,
          }));
        }

        return data;
      })
    );
    const alarms = unFlattenAlarms.flat();

    let insertedData: any = [];
    if (alarms?.length) {
      const workOrders = alarms?.map((d: any) => ({
        deviceId: d?.deviceId,
        alarmType: d?.alarm,
        openedAt: d?.z_timestamp,
      }));

      insertedData = await db
        .insert(workOrder)
        .values(workOrders)
        .onConflictDoNothing({ target: workOrder.openedAt })
        .returning();
    }

    const workOrdersData = await db.query.workOrder.findMany({
      with: {
        device: {
          with: {
            plant: true,
          },
        },
      },
      orderBy: [desc(workOrder.openedAt)],
    });

    return Response.json(workOrdersData, {
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
