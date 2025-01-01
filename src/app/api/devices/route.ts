import { db } from "@/db";
import { device } from "@/db/schema/device";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { tsdb } from "@/tsdb";
import { desc, eq, sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClientReadOnly();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    const devices = await db.query.device.findMany({
      with: { plant: true },
      orderBy: [desc(device.id)],
      where: eq(device.createdBy, userData.user.id),
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
    const supabase = await createSupabaseServerClientReadOnly();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    const body = await request.json();
    const brand = body?.brand;
    const serial = body?.serial;
    const serialNumber = brand?.toLowerCase() + "_" + serial;
    const name = body?.name;
    const createdBy = userData.user.id;
    const plantId = body?.plantId;

    const inverters = await tsdb.execute(
      sql`select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'
        and table_name = ${serialNumber};
      `
    );

    if (!inverters.length) {
      throw new Error(
        "No device found. Please check the brand & serial number."
      );
    }

    const insertedDevice = await db
      .insert(device)
      .values({ serialNumber, name, createdBy, plantId })
      .returning();

    return Response.json(insertedDevice, {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);

    if (error?.code === "23505") {
      return Response.json(
        { message: "Device already exists. Please add a new device." },
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
