"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { DataTable } from "./table/data-table";
import { plants } from "@/lib/data";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchPlantsData() {
  return axios.get(`/api/tsdb/plants_list`);
}

export default function TableContainer() {
  const { data: plantsList, isLoading: isLoadingPlantsList } = useQuery({
    queryKey: ["plants_list"],
    queryFn: fetchPlantsData,
  });

  const plantsData =
    plantsList?.data?.map((plant: any) => ({
      id: plant?.id,
      name: plant?.name,
      isAlert: !!plant?.totalAlert,
      capacity: plant?.capacity,
      production: Math.floor(plant?.ap * 100) / 100,
      power: Math.floor((plant?.ap / plant?.capacity) * 100) / 100,
      dailyProduction: plant?.dpy || 0,
      trend: plant?.trend,
    })) || [];

  if (isLoadingPlantsList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Tabs defaultValue="commercial" className="space-y-5">
        <TabsList className="grid grid-cols-1 w-fit">
          <TabsTrigger value="commercial" className="truncate justify-start">
            Commercial & Residential
          </TabsTrigger>
          {/* <TabsTrigger value="utility">Utility</TabsTrigger> */}
        </TabsList>
        <TabsContent value="commercial">
          <DataTable data={plantsData} columns={columns} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
