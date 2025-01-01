import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Cloudy, Droplets, Sun, TreePine, Wind } from "lucide-react";
import Carousel from "./carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const weathers = [
  {
    degree: 31,
    unitDegree: "C",
    location: "Kuala Lumpur",
    icon: <Sun size={100} />,
    components: [
      {
        name: "humidity",
        value: 1.3,
        unitValue: "MM",
        icon: <Droplets />,
      },
      {
        name: "wind",
        value: 10,
        unitValue: "MPH",
        icon: <Wind />,
      },
    ],
  },
  {
    degree: 28,
    unitDegree: "C",
    location: "Tapah",
    icon: <Cloudy size={100} />,
    components: [
      {
        name: "humidity",
        value: 1.5,
        unitValue: "MM",
        icon: <Droplets />,
      },
      {
        name: "wind",
        value: 10,
        unitValue: "MPH",
        icon: <Wind />,
      },
    ],
  },
];

const CardItem = ({
  data,
  enableDivider = false,
}: {
  data: any;
  enableDivider?: boolean;
}) => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-2">
        <div className="col-span-1 flex items-center justify-center bg-gray-800">
          <div className="flex flex-col px-5 items-center space-y-5 text-white ">
            <p className="text-7xl">
              {data.degree}&#176;{data.unitDegree}
            </p>
            <p className="text-3xl uppercase">{data.location}</p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="p-20 flex items-center justify-center bg-gray-100">
            <Image
              src={data.icon.url}
              width={100}
              height={100}
              alt={data.icon.text}
            />
          </div>
          <div className="flex justify-around bg-foreground-500">
            {data.components.map((component: any, index: any) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-white"
              >
                <p>{component.icon}</p>
                <div className="flex flex-col items-center">
                  <p>{component.value}</p>
                  <p className="uppercase">{component.unitValue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function fetchWeather() {
  return axios.get(`/api/tsdb/weather`);
}

export default function CardWeatherForecast() {
  const {
    data: weatherData,
    isPending: isPendingWeatherData,
    isError: isErrorWeatherData,
  } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    // refetchInterval: 30000,
  });

  const testWeathers = weatherData?.data.bulk.map((data: any) => ({
    degree: data.query.current.temp_c,
    unitDegree: "C",
    location: data.query.location.region,
    icon: {
      url: data.query.current.condition.icon,
      text: data.query.current.condition.text,
    },
    components: [
      {
        name: "humidity",
        value: data.query.current.humidity,
        unitValue: "MM",
        icon: <Droplets />,
      },
      {
        name: "wind",
        value: data.query.current.wind_mph,
        unitValue: "MPH",
        icon: <Wind />,
      },
    ],
  }));

  // console.log(weatherData?.data);

  if (isPendingWeatherData) {
    return <div className="h-full">Loading...</div>;
  }

  return (
    <Card shadow="sm" className="h-full">
      <CardHeader>
        <div>
          <p className="font-semibold">Weather Forecast</p>
          <p className="text-sm font-medium text-foreground-400">
            Today Weather
          </p>
        </div>
      </CardHeader>

      <CardBody>
        <div className="overflow-hidden">
          <Carousel>
            {isErrorWeatherData ? (
              <div>Service not available at the moment</div>
            ) : (
              testWeathers?.map((weather: any, index: any) => (
                <CardItem key={index} data={weather} />
              ))
            )}
          </Carousel>
        </div>
      </CardBody>
    </Card>
  );
}
