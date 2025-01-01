import { db } from "@/db";
import { device } from "@/db/schema/device";
import { eq, isNotNull } from "drizzle-orm";
import {
  get_dpy_ap_queryResult,
  get_mpy_queryResult,
  get_tpy_queryResult,
} from "../_utils";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { plant } from "@/db/schema/plant";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClientReadOnly();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    const filterByRole = (role: "installer" | "user") => {
      if (!role) return undefined;

      if (role === "installer") return eq(plant.createdBy, userData.user.id);

      if (role === "user") return eq(plant.userId, userData.user.id);
    };

    const whereFilter = filterByRole(userData.user.user_metadata?.role);

    const plants = await db.query.plant.findMany({
      with: {
        devices: true,
      },
      where: whereFilter,
    });
    // console.log("plants", plants);

    const plantWithDevices = plants.filter((plant) => plant.devices.length);
    // console.log("plantWithDevices", plantWithDevices);

    const devices = plants.flatMap((plant) => plant.devices);

    // get list of devices that have plant_id
    // const devices = await db.query.device.findMany({
    //   where: isNotNull(device.plantId),
    // });
    // console.log("devices", devices);

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

    const sumCapacity = plants.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue.capacity);
    }, 0);

    // return the cumulative value of each prop
    // for dpy & ap, take the latest value
    // for mpy, sum the monthly values
    // for tpy, sum the yearly values
    const data = [
      {
        ap: Number(dpy_ap.at(0)?.ap) / 1000,
        dpy: Number(dpy_ap.at(0)?.dpy),
        mpy: Number(sumMpy),
        tpy: Number(sumTpy),
        capacity: sumCapacity,
        totalPlant: plants.length,
        activePlant: plantWithDevices.length,
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
