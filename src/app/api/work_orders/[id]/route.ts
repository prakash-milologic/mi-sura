import { db } from "@/db";
import { workOrder } from "@/db/schema/work-order";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log(body);

    if (!body?.closedAt) {
      throw new Error("closedAt is undefined");
    }

    const updatedWorkOrder = await db
      .update(workOrder)
      .set(body)
      .where(eq(workOrder.id, Number(params.id)))
      .returning();

    return Response.json(updatedWorkOrder, {
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
