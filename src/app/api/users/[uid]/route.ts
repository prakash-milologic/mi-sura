import { db } from "@/db";
import { user } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,

  { params }: { params: { uid: string } }
) {
  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, params.uid),
    });

    return Response.json(userData, {
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
