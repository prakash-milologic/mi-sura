"use client";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { BarChart4, CircleDollarSign, Coins } from "lucide-react";
import InverterRankingsTable from "./inverter-rankings-table";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardLayout from "../../../dashboard/_components/card-layout";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

function fetchPlantData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}`);
}

export default function PlantWorkOrder() {
  const { plant_id } = useParams<{ plant_id: string }>();

  const {
    data: plantData,
    isLoading: isLoadingPlantData,
    error: plantDataError,
  } = useQuery({
    queryKey: ["plant_data", plant_id],
    queryFn: () => fetchPlantData(plant_id),
  });

  return (
    <Card shadow="sm" className="rounded-2xl dark:bg-[#262629]">
    <CardHeader className="border-b-1 dark:border-b-[#FFFFFF26] flex justify-center p-6 ">
      <p className=" lg:text-xl text-lg  font-semibold text-black rounded-2xl dark:text-white">Work Order</p>
    </CardHeader>
    <CardBody className="p-0 flex flex-row justify-evenly items-center ">
      <div className="flex flex-col justify-center items-center  gap-2">
        <p className="text-[56px] font-semibold text-[#2848FC]"> {plantData?.data?.[0]?.totalExecutingWO}</p>
        <p className="text-base font-normal text-[#171717CC]">Executing</p>
      </div>
      <div className="w-px h-full bg-[#1717171A]"></div>

      <div className="flex flex-col justify-center items-center gap-2 ">
        <p className="text-[56px] font-semibold text-[#3FC43A]">   {plantData?.data?.[0]?.totalFinishedWO}</p>
        <p className="text-base font-normal text-[#171717CC]">Finished</p>
      </div>
    </CardBody>
  </Card>


    // <Card className="h-full flex flex-col">
    //   <CardHeader>
    //     <CardTitle>Work Order</CardTitle>
    //   </CardHeader>
    //   <CardContent className="text-xs flex items-center justify-around grow">
    //     <div className="space-y-2 flex flex-col items-center">
    //       <div className="text-2xl text-primary-500 font-bold">
    //         {plantData?.data?.[0]?.totalExecutingWO}
    //       </div>
    //       <div>Executing</div>
    //     </div>

    //     <div className="space-y-2 flex flex-col items-center">
    //       <div className="text-2xl text-success-500 font-bold">
    //         {plantData?.data?.[0]?.totalFinishedWO}
    //       </div>
    //       <div>Finished</div>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
