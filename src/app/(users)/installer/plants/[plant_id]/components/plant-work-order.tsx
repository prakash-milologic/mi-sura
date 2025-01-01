"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { BarChart4, CircleDollarSign, Coins } from "lucide-react";
import InverterRankingsTable from "./inverter-rankings-table";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Work Order</CardTitle>
      </CardHeader>
      <CardContent className="text-xs flex items-center justify-around grow">
        <div className="space-y-2 flex flex-col items-center">
          <div className="text-2xl text-primary-500 font-bold">
            {plantData?.data?.[0]?.totalExecutingWO}
          </div>
          <div>Executing</div>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="text-2xl text-success-500 font-bold">
            {plantData?.data?.[0]?.totalFinishedWO}
          </div>
          <div>Finished</div>
        </div>
      </CardContent>
    </Card>
  );
}
