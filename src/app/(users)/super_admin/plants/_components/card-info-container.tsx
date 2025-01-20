"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import CardInfo from "./card-info";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CardLayout from "../../dashboard/_components/card-layout";
import CardInfoChart from "./card-info-chart";

function fetchPlantsData() {
  return axios.get(`/api/tsdb/plants_list`);
}

export default function CardInfoContainer() {
  const { data: plantsList, isLoading: isLoadingPlantsList } = useQuery({
    queryKey: ["plants_list"],
    queryFn: fetchPlantsData,
  });

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <CardLayout title="Plant Overview" className="rounded-2xl dark:bg-[#262629]" >
        <div className="h-[200px] lg:h-[260px] 2xl:h-[300px]">
          <CardInfoChart
            activeValue={10}
            faultValue={Number(5)}
            inactiveValue={10}
          />
        </div>
      </CardLayout>
      <CardLayout title="Device Overview" className="rounded-2xl dark:bg-[#262629]" >
        <div className="h-[200px] lg:h-[260px] 2xl:h-[300px]">
          <CardInfoChart
            activeValue={12}
            faultValue={Number(10)}
            inactiveValue={12}
          />
        </div>
      </CardLayout>
      {/* 
      <CardInfo title="Plant Overview" data={plantsList?.data || []} />
      <CardInfo title="Device Summary" data={plantsList?.data || []} /> */}
    </div>
  );
}
