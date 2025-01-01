import { db } from "@/db";
import { device } from "@/db/schema/device";
import { invt } from "@/db/schema/invt";
import { permission } from "@/db/schema/permission";
import axios from "axios";
import { eq, inArray, or } from "drizzle-orm";

// Get devices of current authenticated account
// (as long as the account is related to the devices directly or indirectly)
export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid;
  const { searchParams } = new URL(request.url);
  const isPlant = searchParams.get("is_plant");
  let plant: true | undefined = undefined;

  try {
    if (isPlant === "true") {
      plant = true;
    }

    const permissions = await db.query.permission.findMany({
      where: or(eq(permission.createdBy, uid), eq(permission.userId, uid)),
      with: {
        user: {
          with: {
            plants: {
              with: { user: true },
            },
          },
        },
      },
    });

    const plants = permissions.map((permission) => permission.user?.plants);
    const flatPlants = plants.flat();
    const plantIds = flatPlants.map((plant) => plant?.id);

    if (!plantIds.length) {
      return Response.json(plantIds, {
        status: 200,
      });
    }

    const devices = await db.query.device.findMany({
      where: inArray(device.plantId, plantIds as number[]),
      with: {
        plant,
      },
    });

    return Response.json(devices, {
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

    const inverter = await db.query.invt.findFirst({
      where: eq(invt.sn, body.serialNumber),
    });

    if (!inverter) {
      throw new Error("No device registered with the serial number");
    }

    const insertedDevice = await db.insert(device).values(body).returning();

    return Response.json(insertedDevice, {
      status: 200,
    });
  } catch (error: any) {
    if (error?.code === "23505") {
      return Response.json(
        {
          message: "Serial number already exists",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}
