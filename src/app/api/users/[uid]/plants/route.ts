import { db } from "@/db";
import { permission } from "@/db/schema/permission";
import { plant } from "@/db/schema/plant";
import { eq, or } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid;
  const { searchParams } = new URL(request.url);
  const isUser = searchParams.get("is_user");
  let user: true | undefined = undefined;

  try {
    if (isUser === "true") {
      user = true;
    }

    const permissions = await db.query.permission.findMany({
      where: or(eq(permission.createdBy, uid), eq(permission.userId, uid)),
      with: {
        user: {
          with: {
            plants: {
              with: { user, devices: true },
            },
          },
        },
      },
    });

    const plants = permissions.map((permission) => permission.user?.plants);
    const flatPlants = plants.flat();

    return Response.json(flatPlants, {
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

export async function POST(
  request: Request,

  { params }: { params: { uid: string } }
) {
  const uid = params.uid;

  try {
    const body = await request.json();

    const insertedPlant = await db
      .insert(plant)
      .values({ ...body, createdBy: uid })
      .returning();

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
