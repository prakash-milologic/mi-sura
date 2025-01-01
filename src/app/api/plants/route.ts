import { db } from "@/db";
import { plant } from "@/db/schema/plant";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { asc, desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isUser = searchParams.get("is_user");
  let user: true | undefined = undefined;

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

    if (isUser && isUser === "true") {
      user = true;
    }

    const plants = await db.query.plant.findMany({
      with: {
        user,
        devices: true,
      },
      orderBy: [desc(plant.createdAt)],
      where: whereFilter,
    });

    return Response.json(plants, {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const insertedPlant = await db.insert(plant).values(body).returning();

    return Response.json(insertedPlant, {
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
