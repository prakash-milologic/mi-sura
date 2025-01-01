"use client";
import { plants } from "@/lib/data";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  MinusCircledIcon,
} from "@radix-ui/react-icons";
import React from "react";
import PlantContent from "./components/plant-content";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound } from "next/navigation";

function fetchDailyInverterData() {
  return axios.get(`/api/tsdb/daily_inverter_data`);
}

function fetchPlantData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}`);
}

export default function PlantIdPage({
  params,
}: {
  params: { plant_id: string };
}) {
  const { plant_id } = params;
  // const { data: dailyInverterData, isLoading: isLoadingDailyInverterData } =
  //   useQuery({
  //     queryKey: ["daily_inverter_data"],
  //     queryFn: fetchDailyInverterData,
  //   });

  const {
    data: plantData,
    isLoading: isLoadingPlantData,
    error: plantDataError,
  } = useQuery({
    queryKey: ["plant_data", plant_id],
    queryFn: () => fetchPlantData(plant_id),
    refetchInterval: 30000,
  });

  // console.log("plantData", plantData?.data);

  // function Alert() {
  //   const alarm = dailyInverterData?.data?.[0]?.alarm || "No Alarm";
  //   if (alarm == undefined) {
  //     return (
  //       <>
  //         <MinusCircledIcon />
  //         <div className="text-sm font-light">Alerts N/A</div>
  //       </>
  //     );
  //   }
  //   if (alarm === "No Alarm") {
  //     return (
  //       <>
  //         <CheckCircledIcon color="green" />
  //         <div className="text-sm font-light">No alerts</div>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <ExclamationTriangleIcon color="yellow" />
  //         <div className="text-sm font-light">Alerts found</div>
  //       </>
  //     );
  //   }
  // }

  // const plant = plants.find((plant) => plant.id === plant_id);

  // if(!plant_id){
  //   return <div className="p-6">No plant found</div>;
  // }

  if (isLoadingPlantData) {
    return <div className="py-6">Loading...</div>;
  }

  if (plantDataError) {
    notFound();
  }

  // if (!plant) {
  //   return <div className="p-6">Please select correct plant</div>;
  // }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold">{plantData?.data?.[0]?.name}</h1>
      <div className="flex items-center space-x-2 mb-1">{/* <Alert /> */}</div>
      <PlantContent data={plantData?.data} />
    </div>
  );
}
