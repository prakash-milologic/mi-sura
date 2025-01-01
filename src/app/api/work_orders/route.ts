import { db } from "@/db";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeQuery = searchParams.get("time");
  const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    const workOrders = await db.execute(
      sql.raw(`SELECT * 
        FROM work_order
        WHERE date_trunc('day',opened_at AT TIME ZONE '${currentTZ}') = date_trunc('day','${timeQuery}' AT TIME ZONE '${currentTZ}')
        ORDER BY opened_at DESC;
        `)
    );

    return Response.json(workOrders, {
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
