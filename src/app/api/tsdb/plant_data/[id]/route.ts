import { db } from "@/db";
import {
  get_dpy_ap_queryResult,
  get_mpy_queryResult,
  get_tpy_queryResult,
} from "../../_utils";
import { eq, inArray } from "drizzle-orm";
import { device } from "@/db/schema/device";
import { workOrder } from "@/db/schema/work-order";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const plantId = Number(params.id);

  try {
    // get list of devices of specified plant_id
    const devices = await db.query.device.findMany({
      where: eq(device.plantId, plantId),
      with: {
        plant: true,
      },
    });
    // console.log("devices", devices);

    const flatDevices = devices.flat();
    const deviceIds = flatDevices.map((device) => device.id);

    // get list of work orders of devices on specified plant_id
    const workOrders = await db.query.workOrder.findMany({
      where: inArray(workOrder.deviceId, deviceIds),
    });

    // get list of work orders that have been closed
    const finishedWorkOrders = workOrders.filter((wo) => wo.closedAt);

    // get list of work orders that haven't been closed
    const executingWorkOrders = workOrders.filter((wo) => !wo.closedAt);

    if (!devices.length) throw new Error("No device found");

    const dpy_ap = await get_dpy_ap_queryResult(devices);
    // console.log("dpy_ap", dpy_ap);

    const mpy = await get_mpy_queryResult(devices);
    // console.log("mpy", mpy);

    const tpy = await get_tpy_queryResult(devices);
    // console.log("tpy", tpy);

    const sumMpy = mpy.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue?.mpy);
    }, 0);
    // console.log("sumMpy", sumMpy);

    const sumTpy = tpy.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue?.tpy);
    }, 0);
    // console.log("sumTpy", sumTpy);

    // return the cumulative value of each prop
    // for dpy & ap, take the latest value
    // for mpy, sum the monthly values
    // for tpy, sum the yearly values
    const data = [
      {
        name: devices.at(0)?.plant?.name,
        location: devices.at(0)?.plant?.address,
        totalExecutingWO: executingWorkOrders.length,
        totalFinishedWO: finishedWorkOrders.length,
        totalDevice: devices.length,
        capacity: Number(devices.at(0)?.plant?.capacity),
        ap: Number(dpy_ap.at(0)?.ap) / 1000,
        dpy: Number(dpy_ap.at(0)?.dpy),
        mpy: Number(sumMpy),
        tpy: Number(sumTpy),
      },
    ];
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
