import { tsdb } from "@/tsdb";
import axios from "axios";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  try {
    // free tier
    const data = await Promise.all([
      await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Kuala Lumpur`
      ),
      await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Kedah`
      ),
    ]);

    // paid tier
    // const res = await axios.post(
    //   `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=bulk`,
    //   {
    //     locations: [
    //       {
    //         q: "Kuala Lumpur",
    //         custom_id: "plant-1",
    //       },
    //       {
    //         q: "Kedah",
    //         custom_id: "plant-2",
    //       },
    //     ],
    //   }
    // );

    // const data = res.data;

    return Response.json(
      { bulk: [{ query: data[0].data }, { query: data[1].data }] },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}
