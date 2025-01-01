import { db } from "@/db";
import { eq, inArray, sql } from "drizzle-orm";
import { device } from "@/db/schema/device";
import { workOrder } from "@/db/schema/work-order";
import { tsdb } from "@/tsdb";
import { get_tpy_carbon_footprint } from "../../../_utils";
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

    if (!devices.length) throw new Error("No device found");

    const data = await get_tpy_carbon_footprint(devices);

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
