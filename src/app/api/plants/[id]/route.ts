import { db } from "@/db";
import { plant } from "@/db/schema/plant";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const plantData = await db.query.plant.findFirst({
      with: { user: true },
      where: eq(plant.id, id),
    });

    if (!plantData) throw new Error("No data found");

    return Response.json(plantData, {
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const body = await request.json();

    const updatedPlant = await db
      .update(plant)
      .set(body)
      .where(eq(plant.id, id))
      .returning();

    return Response.json(updatedPlant, {
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const plantId = Number(params.id);

    const deletedPlant = await db.delete(plant).where(eq(plant.id, plantId));

    return Response.json(deletedPlant, {
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
