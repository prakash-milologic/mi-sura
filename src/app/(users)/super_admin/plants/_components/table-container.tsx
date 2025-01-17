"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

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
  const getColumnsId = (id: string) => {

  }

  return (
    <div className="bg-white dark: dark:bg-[#262629] mt-6  rounded-2xl">
          <DataTable data={plantsData} columns={columns} />
    </div>
  );
}
