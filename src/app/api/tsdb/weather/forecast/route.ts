import { tsdb } from "@/tsdb";
import axios from "axios";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  try {
    const res = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Kuala Lumpur&days=4&aqi=no&alerts=no`
    );

    const data = res.data;

    return Response.json(data, {
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
