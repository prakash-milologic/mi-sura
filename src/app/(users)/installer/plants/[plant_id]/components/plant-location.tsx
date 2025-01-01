"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

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

  return (
    <Card className="h-full">
      <CardHeader className="relative h-40 mb-2">
        <Image src={"/plant.jpg"} alt="plant image" fill objectFit="cover" />
      </CardHeader>
      <CardContent className="px-3 space-y-4">
        <div className="flex items-center space-x-4 justify-between text-sm">
          <div>Address</div>
          <div className="truncate max-w-[20rem]">
            {plantData?.data?.[0]?.location}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>Plant Type</div>
          <div>Commercial</div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>System Type</div>
          <div>PV + Grid</div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>Phone</div>
          <div>-</div>
        </div>
      </CardContent>
    </Card>
  );
}
