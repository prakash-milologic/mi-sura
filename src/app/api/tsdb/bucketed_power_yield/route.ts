import { currentTZ } from "@/lib/utils";
import { tsdb } from "@/tsdb";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { device } from "@/db/schema/device";
import { isNotNull } from "drizzle-orm";
import {
  get_dpy_ap_queryResult,
  get_mpy_queryResult,
  get_tpy_queryResult,
} from "../_utils";
import { type NextRequest } from "next/server";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { plant } from "@/db/schema/plant";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get("period");

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

    // get plant list including respective devices
    const plants = await db.query.plant.findMany({
      with: {
        devices: true,
      },
      where: whereFilter,
    });

    // get list of devices respective to the plants
    const devices = plants.flatMap((plant) => plant.devices);

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
