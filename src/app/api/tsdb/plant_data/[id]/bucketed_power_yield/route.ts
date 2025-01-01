import { db } from "@/db";
import { device } from "@/db/schema/device";
import { eq, isNotNull } from "drizzle-orm";
import {
  get_dpy_ap_queryResult,
  get_mpy_queryResult,
  get_tpy_queryResult,
} from "../../../_utils";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get("period");
  const plantId = Number(params.id);

  try {
    // get list of devices of specified plant_id
    const devices = await db.query.device.findMany({
      where: eq(device.plantId, plantId),
      with: {
        plant: true,
      },
    });

    if (!devices.length) throw new Error("No device found");

    let data: any = [];

    if (period === "daily") {
      data = await get_dpy_ap_queryResult(devices);
    } else if (period === "monthly") {
      data = await get_mpy_queryResult(devices);
    } else if (period === "yearly") {
      data = await get_tpy_queryResult(devices);
    }

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
