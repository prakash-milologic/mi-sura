"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import CardInfo from "./card-info";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function fetchPlantsData() {
  return axios.get(`/api/tsdb/plants_list`);
}

export default function CardInfoContainer() {
  const { data: plantsList, isLoading: isLoadingPlantsList } = useQuery({
    queryKey: ["plants_list"],
    queryFn: fetchPlantsData,
  });

  const totalPlant = plantsList?.data?.length || "0";
  const activePlant = plantsList?.data?.filter(
    (plant: any) => plant?.isActive
  )?.length;
  const inactivePlant = plantsList?.data?.filter(
    (plant: any) => !plant?.isActive
  )?.length;

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <CardInfo title="Plant Overview" data={plantsList?.data || []} />
      <CardInfo title="Device Summary" data={plantsList?.data || []} />
    </div>
  );
}
