import { db } from "@/db";
import { workOrder } from "@/db/schema/work-order";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const insertedWorkOrder = await db
      .insert(workOrder)
      .values(body)
      .returning();

    return Response.json(insertedWorkOrder, {
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
