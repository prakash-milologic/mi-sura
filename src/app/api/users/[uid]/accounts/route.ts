import { db } from "@/db";
import { permission } from "@/db/schema/permission";
import { user } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,

  { params }: { params: { uid: string } }
) {
  const uid = params.uid;

  try {
    const permissions = await db.query.permission.findMany({
      where: eq(permission.createdBy, uid),
      with: {
        user: true,
      },
    });

    const users = permissions.map((permission) => permission.user);

    return Response.json(users, {
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
