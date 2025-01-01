"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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

export default function PlantHistory() {
  const { plant_id } = useParams<{ plant_id: string }>();

  const { data: bucketedPowerYield, isLoading: isLoadingBucketedPowerYield } =
    useQuery({
      queryKey: ["bucketed_power_yield", plant_id, "daily"],
      queryFn: () =>
        fetchBucketedPowerYield({ plantId: plant_id, period: "daily" }),
      refetchInterval: 30000,
    });

  // console.log("bucketedPowerYield", bucketedPowerYield?.data);

  if (isLoadingBucketedPowerYield) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-around">
          <div>
            {/* <div className="text-foreground-500">Daily Production</div> */}
            {/* <div className="font-medium text-lg">
              {dailyPowerYield == undefined ? (
                "N/A"
              ) : (
                <div className="flex space-x-1 items-end">
                  <div>{dailyPowerYield}</div>
                  <span className="font-normal text-base text-foreground-500">
                    kWh
                  </span>
                </div>
              )}
            </div> */}
          </div>

          {/* <Separator className="sm:hidden" />

          <div>
            <div className="text-foreground-500">Daily Irradiation</div>
            <div className="font-medium text-lg">--</div>
          </div>

          <Separator className="sm:hidden" /> */}

          {/* <div>
            <div className="text-foreground-500">Peak Hours Today</div>
            <div className="font-medium text-lg">
              1.91{" "}
              <span className="font-normal text-base text-foreground-500">
                h
              </span>
            </div>
          </div> */}

          <Separator className="sm:hidden" />
        </div>

        <div className="h-52">
          <HistoryChart data={bucketedPowerYield?.data} />
        </div>
      </CardContent>
    </Card>
  );
}
