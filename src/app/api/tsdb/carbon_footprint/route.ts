import { db } from "@/db";
import { eq, inArray, sql } from "drizzle-orm";
import { device } from "@/db/schema/device";
import { workOrder } from "@/db/schema/work-order";
import { tsdb } from "@/tsdb";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { plant } from "@/db/schema/plant";
import { get_tpy_carbon_footprint } from "../_utils";
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

    // get plants of respective user roles
    const plants = await db.query.plant.findMany({
      with: {
        devices: true,
      },
      where: whereFilter,
    });

    const devices = plants.flatMap((plant) => plant.devices);

    let data: any[] = [];

    if (devices.length) {
      data = await get_tpy_carbon_footprint(devices);
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
