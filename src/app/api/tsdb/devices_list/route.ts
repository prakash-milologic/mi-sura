import { db } from "@/db";
import { device, DeviceWithPlant } from "@/db/schema/device";
import { permission } from "@/db/schema/permission";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { desc, eq, inArray, isNotNull, sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClientReadOnly();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    let devices: DeviceWithPlant[] = [];

    devices = await db.query.device.findMany({
      with: {
        plant: true,
      },
      orderBy: [desc(device.createdAt)],
    });

    // get devices that belong to respective installer & admin
    if (userData.user.user_metadata?.role === "admin") {
      const installers = await db.query.permission.findMany({
        with: { user: true },
        where: eq(permission.createdBy, userData.user.id),
      });

      const installerIds = installers.map((installer) => installer.userId!);

      if (installerIds.length) {
        // get list of devices that have plant_id
        // include respective plant
        devices = await db.query.device.findMany({
          where: inArray(device.createdBy, installerIds),
          with: {
            plant: true,
          },
          orderBy: [desc(device.createdAt)],
        });
      } else {
        devices = [];
      }
    }

    const result = await Promise.all(
      devices.map(async (device) => {
        // get device brand
        const deviceBrand = device.serialNumber.split("_")[0];

        const tableWithTimestamp = await tsdb.execute(
          sql.raw(
            `
              SELECT column_name
              FROM information_schema.columns
              WHERE table_name='${device.serialNumber}' and column_name='z_timestamp';
            `
          )
        );
        const isTimestampExist = tableWithTimestamp.length ? true : false;

        let deviceData: any[] = [];
        if (isTimestampExist) {
          deviceData = await tsdb.execute(
            sql.raw(
              `SELECT dpy ${deviceBrand === "sungrow" ? "* 0.1" : ""} as dpy, ap
                  FROM ${device.serialNumber}
                  WHERE date_trunc('day',z_timestamp AT TIME ZONE '${currentTZ}') = date_trunc('day',current_date AT TIME ZONE '${currentTZ}')
                  ORDER BY z_timestamp DESC
                  LIMIT 5;
              `
            )
          );
        }

        const ap = deviceData.at(0)?.ap ? Number(deviceData.at(0)?.ap) : 0;

        return {
          id: device.serialNumber,
          name: device.name,
          status: "active",
          connectedPlant: device.plant?.name,
          production: Math.floor(ap * 0.001 * 1000) / 1000,
          dailyProduction: Math.floor(deviceData.at(0)?.dpy * 1000) / 1000 || 0,
          installer: device.createdBy,
        };
      })
    );

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
