"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardBody, CardHeader, Chip, cn } from "@nextui-org/react";
import { PlantReport } from "@/app/assets/SVGCollection";
import { MapPin, Phone, Settings } from "lucide-react";
import { useTheme } from "next-themes";

function fetchPlantData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}`);
}

export default function PlantLocation() {
  const { plant_id } = useParams<{ plant_id: string }>();

  const {
    data: plantData,
    isLoading: isLoadingPlantData,
    error: plantDataError,
  } = useQuery({
    queryKey: ["plant_data", plant_id],
    queryFn: () => fetchPlantData(plant_id),
  });
  const {theme} = useTheme();

  const plantDetails = [
    {
      icon: <PlantReport isCurrent={theme == "dark" ? true : false} />,
      label: "Plant Type",
      value: "Commercial",
    },
    {
      icon: <Settings className="w-5 h-5 text-[#686868] dark:text-[#009848]" />,
      label: "System Type",
      value: "PV + Grid",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#686868] dark:text-[#009848]" />,
      label: "Address",
      value: plantData?.data?.[0]?.location ?? "-",
    },
    {
      icon: <Phone className="w-5 h-5 text-[#686868 dark:text-[#009848]" />,
      label: "Phone",
      value: "+60 11-6939-2283",
    }
  ]

  return (
    <Card shadow="sm" className=" rounded-2xl dark:bg-[#262629] h-full">
      <CardHeader className="p-6 m-0 flex-col items-center border-b dark:border-b-[#FFFFFF1A]">
        <p className="text-[#171717] dark:text-white font-semibold text-xl  lg:text-4xl ">{plantData?.data?.[0]?.name}</p>
        <div className="flex space-x-2 mt-2 mb-6 items-center ">
            <p className={`text-xs lg:text-sm font-normal text-[#171717BF] dark:text-[#FFFFFFBF]`}>
                Status:
              </p>
              {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
              <Chip size="sm"  className={cn('px-3 py-1 bg-[#3FC43A] text-white')} radius="lg">
                <p className="font-medium text-xs lg:text-sm font-bold "> Normal</p>
              </Chip>
            </div>
        <Image src={"/plant.jpg"} alt="plant image" width={407} height={2220} objectFit="cover" className="rounded-xl" />

      </CardHeader>
      <CardBody className="p-6 m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
        {
          plantDetails.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="h-[44px] w-[44px] flex justify-center items-center   rounded-lg bg-[#EFF6FF] dark:bg-[#00984826]">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-xs lg:text-sm font-normal text-[#171717BF] dark:text-[#FFFFFFBF]">{item.label}</p>
                <p className="text-xs lg:text-sm font-medium text-[#171717] dark:text-[#FFFFFFBF]">{item.value && item.value.indexOf(',') > -1 ? item.value.split(",")[0] : item.value}</p>
              </div>
            </div>
          ))
        }
     
      </CardBody>
    </Card>
  );
}
