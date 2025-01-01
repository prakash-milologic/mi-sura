import { db } from "@/db";
import { get_dpy_ap_queryResult } from "../_utils";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { desc, eq } from "drizzle-orm";
import { plant } from "@/db/schema/plant";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit"));

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
      limit,
      orderBy: [desc(plant.createdAt)],
      where: whereFilter,
    });
    // console.log("plants", plants);

    // return plants info and cumulative ap of respective devices
    const data = await Promise.all(
      plants.map(async (plant) => {
        const devices = plant.devices;
        let ap;

        if (devices.length) {
          const dpy_ap = await get_dpy_ap_queryResult(devices);
          ap = dpy_ap.at(0)?.ap;
        }

        return {
          name: plant.name,
          address: plant.address,
          isActive: !!plant.devices.length,
          ap: Number(ap) * 0.001,
          totalDevice: plant.devices.length,
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
