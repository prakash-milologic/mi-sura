import { db } from "@/db";
import { device } from "@/db/schema/device";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const deviceData = await db.query.device.findFirst({
      with: { plant: true },
      where: eq(device.serialNumber, id),
    });

    if (!deviceData) throw new Error("No data found");

    return Response.json(deviceData, {
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
  const id = params.id;

  try {
    const body = await request.json();

    const updatedDevice = await db
      .update(device)
      .set(body)
      .where(eq(device.serialNumber, id))
      .returning();

    return Response.json(updatedDevice, {
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
    const deviceId = Number(params.id);

    const deletedDevice = await db
      .delete(device)
      .where(eq(device.id, deviceId));

    return Response.json(deletedDevice, {
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
