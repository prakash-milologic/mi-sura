import { db } from "@/db";
import { permission } from "@/db/schema/permission";
import { user } from "@/db/schema/user";
import { createSupabaseServerClientReadOnly } from "@/lib/supabase";
import { and, eq, inArray } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  try {
    const supabase = await createSupabaseServerClientReadOnly();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    // get users of the specified role
    let whereFilter = role ? eq(permission.role, role) : undefined;

    // get users of the specified role created by admin
    if (userData.user.user_metadata?.role === "admin") {
      const installers = await db.query.permission.findMany({
        with: { user: true },
        where: eq(permission.createdBy, userData.user.id),
      });

      const installerIds = installers.map((installer) => installer.userId!);

      whereFilter = role
        ? and(
            eq(permission.role, role),
            inArray(permission.userId, installerIds)
          )
        : undefined;
    }

    const permissions = await db.query.permission.findMany({
      with: { user: true },
      where: whereFilter,
    });

    return Response.json(permissions, {
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
