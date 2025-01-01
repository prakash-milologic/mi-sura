import { db } from "@/db";
import { get_dpy_ap_queryResult, getAlarms } from "../_utils";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit"));

  try {
    // get plant list including respective devices
    const plants = await db.query.plant.findMany({
      with: {
        devices: true,
      },
      limit,
    });
    // console.log("plants", plants);

    // return plants info and respective devices data
    const data = await Promise.all(
      plants.map(async (plant) => {
        const devices = plant.devices;
        let totalAlert = 0;
        let dpy_ap;
        let ap;
        let dpy;

        if (devices.length) {
          dpy_ap = await get_dpy_ap_queryResult(devices);

          await Promise.all(
            devices.map(async (device) => {
              const alarms = await getAlarms(
                device.serialNumber,
                new Date().toISOString()
              );
              totalAlert += alarms.length;
            })
          );

          ap = dpy_ap.at(0)?.ap;
          dpy = dpy_ap.at(0)?.dpy;
          dpy_ap = dpy_ap?.slice(0, 5); // take the first 5 records as trend
        }

        return {
          id: plant.id,
          name: plant.name,
          isActive: !!plant.devices.length,
          capacity: Number(plant.capacity),
          ap: Number(ap) * 0.001,
          dpy: Number(dpy),
          trend: dpy_ap || null,
          totalAlert,
        };
      })
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
