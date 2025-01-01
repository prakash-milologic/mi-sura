import { db } from "@/db";
import { permission } from "@/db/schema/permission";
import { user } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const createdBy = searchParams.get("created_by");

  try {
    if (createdBy) {
      const permissions = await db.query.permission.findMany({
        where: eq(permission.createdBy, createdBy),
        with: {
          user: true,
        },
      });

      const users = permissions.map((permission) => permission.user);

      return Response.json(users, {
        status: 200,
      });
    }

    const users = await db.query.user.findMany();

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
