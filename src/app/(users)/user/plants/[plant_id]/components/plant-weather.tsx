"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CloudDrizzle, Sunrise, Sunset, Wind } from "lucide-react";
import React from "react";
import WeatherChart from "./weather-chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Image } from "@nextui-org/react";

function fetchWeatherForecast() {
  return axios.get(`/api/tsdb/weather/forecast`);
}

export default function PlantWeather() {
  const {
    data: weatherForecastData,
    isLoading: isLoadingWeatherForecastData,
    isError: isErrorWeatherForecastData,
  } = useQuery({
    queryKey: ["weather_forecast"],
    queryFn: fetchWeatherForecast,
    // refetchInterval: 30000,
  });

  const tempC = weatherForecastData?.data.current.temp_c;
  const weatherCondition = weatherForecastData?.data.current.condition.text;
  const windMph = weatherForecastData?.data.current.wind_mph;
  const sunrise =
    weatherForecastData?.data.forecast.forecastday[0].astro.sunrise;
  const sunset = weatherForecastData?.data.forecast.forecastday[0].astro.sunset;
  const currentWeatherIcon = weatherForecastData?.data.current.condition.icon;
  const currentDay = format(new Date(), "eee");

  const forecastDays = weatherForecastData?.data.forecast.forecastday;

  if (isLoadingWeatherForecastData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full">
      {isErrorWeatherForecastData ? (
        <div>Service not available at the moment</div>
      ) : (
        <>
          <CardHeader>
            <div className="flex items-center">
              <div className="flex-auto">
                <div className="text-xl font-bold mb-1">{tempC}&#8451;</div>
                <div className="space-y-1">
                  <div className="text-sm">{weatherCondition}</div>
                  <div className="flex items-center text-xs">
                    <Wind size={"15px"} className="mr-1" /> {windMph} mph
                  </div>
                  <div className="text-sm flex space-x-2">
                    <div className="flex items-center text-xs">
                      <Sunrise size={"15px"} className="mr-1" /> {sunrise}
                    </div>
                    <div className="flex items-center text-xs">
                      <Sunset size={"15px"} className="mr-1" /> {sunset}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1 flex-none text-xs">
                <Image
                  src={currentWeatherIcon}
                  width={50}
                  height={50}
                  alt={weatherCondition}
                />
                <div className="uppercase text-center">{currentDay}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-20">
              <WeatherChart forecastDays={forecastDays} />
            </div>
          </CardContent>
          <CardFooter className="gap-x-3 text-xs grid grid-cols-3 font-light">
            {forecastDays.slice(1).map((forecast: any, index: any) => (
              <div key={index} className="space-y-2 flex flex-col items-center">
                <div>{forecast.day.avgtemp_c}&#8451;</div>
                <Image
                  src={currentWeatherIcon}
                  width={30}
                  height={30}
                  alt={weatherCondition}
                />
                <div>{format(new Date(forecast.date), "eee")}</div>
                <div>{format(new Date(forecast.date), "dd/MM")}</div>
              </div>
            ))}

            {/* <div className="space-y-2 flex flex-col items-center">
          <div>23&#8451;</div>
          <CloudDrizzle />
          <div>THU</div>
          <div>30/11</div>
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <div>23&#8451;</div>
          <CloudDrizzle />
          <div>FRI</div>
          <div>1/12</div>
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <div>23&#8451;</div>
          <CloudDrizzle />
          <div>SAT</div>
          <div>2/12</div>
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <div>23&#8451;</div>
          <CloudDrizzle />
          <div>SUN</div>
          <div>3/12</div>
        </div> */}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
