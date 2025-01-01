"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { BarChart4, CircleDollarSign, Coins } from "lucide-react";
import PlannedProductionChart from "./planned-production-chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

function fetchBucketedPowerYield({
  plantId,
  period,
}: {
  plantId: string;
  period: "daily" | "monthly" | "yearly";
}) {
  return axios.get(
    `/api/tsdb/plant_data/${plantId}/bucketed_power_yield?period=${period}`
  );
}

export default function PlantPlannedProduction() {
  const { plant_id } = useParams<{ plant_id: string }>();

  const { data: bucketedPowerYield, isLoading: isLoadingBucketedPowerYield } =
    useQuery({
      queryKey: ["bucketed_power_yield", plant_id, "monthly"],
      queryFn: () =>
        fetchBucketedPowerYield({ plantId: plant_id, period: "monthly" }),
      refetchInterval: 30000,
    });

  if (isLoadingBucketedPowerYield) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Planned Production</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-52">
          <PlannedProductionChart data={bucketedPowerYield?.data} />
        </div>
      </CardContent>
    </Card>
  );
}
