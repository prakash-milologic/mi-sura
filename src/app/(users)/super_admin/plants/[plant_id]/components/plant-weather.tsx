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
import CardLayout from "../../../dashboard/_components/card-layout";
import { SunnyIcon } from "@/app/assets/SVGCollection";

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

  const weathers = [
    {
      icon: <SunnyIcon />,
      label: "Sunny",
      value: "24°C",
      currentDate: "Jan 14",
      sunrise: "06:00 AM",
      sunset: "06:00 PM",
      wind: "10 mph",
    },
    {
      icon: <SunnyIcon />,
      label: "Cloudy",
      value: "24°C",
      currentDate: "Jan 14",
      sunrise: "06:00 AM",
      sunset: "06:00 PM",
      wind: "10 mph",
    },
    {
      icon: <SunnyIcon />,
      label: "Sunrise",
      value: "24°C",
      currentDate: "Jan 14",
      sunrise: "06:00 AM",
      sunset: "06:00 PM",
      wind: "10 mph",
    }

  ]

  return (
    <CardLayout title="Current Weather" className="max-h-[510px] h-full rounded-2xl dark:bg-[#262629]" >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {
          weathers.map((item, index) => {
            return (
              <div key={index} className="pt-3 px-6 pb-6 bg-[#DEEDFF80] dark:bg-[#333338] rounded-xl">
                <p className="text-xs font-normal text-[#171717BF] float-right dark:text-[#FFFFFFBF]">{item.currentDate}</p>
                <div className="flex items-center gap-4 mt-4">
                  {item.icon}
                  <div>
                    <p className="text-xl xl:text-[32px] font-semibold texxt-[#171717] dark:text-white ">{item.value}</p>
                    <p className="text-base xl:text-lg font-normal text-[#171717BF] pt-3 dark:text-[#FFFFFFBF] ">{item.label}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 gap-1.5 flex-wrap ">
                  <div className="flex flex-col pr-2  xl:border-r border-[#1717171A] dark:border-[#FFFFFF1A] ">
                    <p className="text-xs font-normal text-[#171717BF] dark:text-[#FFFFFFCC]" >Sunrise</p>
                    <p className="text-sm xl:text-base font-medium text-[#171717CC] dark:text-[#FFFFFFCC]">{item.sunrise}</p>
                  </div>
                  <div className="flex flex-col pr-2 xl:border-r border-[#1717171A] dark:border-[#FFFFFF1A]">
                    <p className="text-xs font-normal text-[#171717BF] dark:text-[#FFFFFFCC]" >Sunset</p>
                    <p className="text-sm xl:text-base font-medium text-[#171717CC] dark:text-[#FFFFFFCC]">{item.sunset}</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-xs font-normal text-[#171717BF] dark:text-[#FFFFFFCC]" >wind</p>
                    <p className="text-sm xl:text-base font-medium text-[#171717CC] dark:text-[#FFFFFFCC]">{item.wind}</p>
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>

    </CardLayout>

    // <Card className="h-full">
    //   {isErrorWeatherForecastData ? (
    //     <div>Service not available at the moment</div>
    //   ) : (
    //     <>
    //       <CardHeader>
    //         <div className="flex items-center">
    //           <div className="flex-auto">
    //             <div className="text-xl font-bold mb-1">{tempC}&#8451;</div>
    //             <div className="space-y-1">
    //               <div className="text-sm">{weatherCondition}</div>
    //               <div className="flex items-center text-xs">
    //                 <Wind size={"15px"} className="mr-1" /> {windMph} mph
    //               </div>
    //               <div className="text-sm flex space-x-2">
    //                 <div className="flex items-center text-xs">
    //                   <Sunrise size={"15px"} className="mr-1" /> {sunrise}
    //                 </div>
    //                 <div className="flex items-center text-xs">
    //                   <Sunset size={"15px"} className="mr-1" /> {sunset}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="space-y-1 flex-none text-xs">
    //             <Image
    //               src={currentWeatherIcon}
    //               width={50}
    //               height={50}
    //               alt={weatherCondition}
    //             />
    //             <div className="uppercase text-center">{currentDay}</div>
    //           </div>
    //         </div>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="h-20">
    //           <WeatherChart forecastDays={forecastDays} />
    //         </div>
    //       </CardContent>
    //       <CardFooter className="gap-x-3 text-xs grid grid-cols-3 font-light">
    //         {forecastDays.slice(1).map((forecast: any, index: any) => (
    //           <div key={index} className="space-y-2 flex flex-col items-center">
    //             <div>{forecast.day.avgtemp_c}&#8451;</div>
    //             <Image
    //               src={currentWeatherIcon}
    //               width={30}
    //               height={30}
    //               alt={weatherCondition}
    //             />
    //             <div>{format(new Date(forecast.date), "eee")}</div>
    //             <div>{format(new Date(forecast.date), "dd/MM")}</div>
    //           </div>
    //         ))}

    //       </CardFooter>
    //     </>
    //   )}
    // </Card>
  );
}
