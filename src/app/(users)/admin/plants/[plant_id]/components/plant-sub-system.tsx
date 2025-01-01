import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { BarChart4, CircleDollarSign, Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

function fetchCarbonFootprintByPlantIdData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}/carbon_footprint`);
}

export default function PlantSubsystem({ data }: { data: any[] }) {
  const { plant_id } = useParams<{ plant_id: string }>();

  const {
    data: carbonFootprintByPlantIdData,
    isLoading: isLoadingCarbonFootprintByPlantIdData,
    error: carbonFootprintByPlantIdError,
  } = useQuery({
    queryKey: ["carbon_footprint_data_by_plant_id", plant_id],
    queryFn: () => fetchCarbonFootprintByPlantIdData(plant_id),
    refetchInterval: 30000,
  });

  function getDailyPowerYield() {
    let dailyPowerYield = data?.[0]?.dpy;
    return Number(dailyPowerYield);
  }

  function getMonthlyPowerYield() {
    let monthlyPowerYield = data?.[0]?.mpy;
    return Number(monthlyPowerYield);
  }

  function getTotalPowerYield() {
    let totalPowerYield = data?.[0]?.tpy;
    return Number(totalPowerYield * 12);
  }

  function getDailyRevenue() {
    let dailyPowerYield = getDailyPowerYield();
    let tariff = 0.57; // static value refer to tariff given by mimos
    let dailyRevenue = Math.floor(dailyPowerYield * tariff * 100) / 100;
    return dailyRevenue;
  }

  function getMonthlyRevenue() {
    let monthlyPowerYield = getMonthlyPowerYield();
    let tariff = 0.57; // static value refer to tariff given by mimos
    let monthlyRevenue = Math.floor(monthlyPowerYield * tariff * 100) / 100;
    return monthlyRevenue;
  }

  function getTotalRevenue() {
    let totalPowerYield = getTotalPowerYield();
    let tariff = 0.57; // static value refer to tariff given by mimos
    let totalRevenue = Math.floor(totalPowerYield * tariff * 100) / 100;
    return totalRevenue;
  }

  const TARGET_NET_ZERO = 7; // (GW) statically determined based on target net zero of 2030

  function getCurrentNetZeroContribution() {
    let totalPowerYield = carbonFootprintByPlantIdData?.data?.[0]?.tpy; // KW
    let convertedPower = totalPowerYield * 0.000001; // convert from KW to GW
    let result = convertedPower / TARGET_NET_ZERO;
    return Math.floor(result * 100) / 100;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Subsystem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-5">
        <Card>
          <CardHeader>
            <CardTitle>Plant Revenue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3">
            <div className="flex flex-col items-center text-sm">
              <CircleDollarSign size={50} className="mb-3 text-success-400" />
              <div>Today</div>
              <div>
                RM{" "}
                <span className="text-lg font-bold">
                  {getDailyRevenue() == undefined ? "-" : getDailyRevenue()}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm">
              <Coins size={50} className="mb-3 text-warning-400" />
              <div>This Month</div>
              <div>
                RM{" "}
                <span className="text-lg font-bold">
                  {getMonthlyRevenue() == undefined ? "-" : getMonthlyRevenue()}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm">
              <BarChart4 size={50} className="mb-3 text-danger-400" />
              <div>Lifetime</div>
              <div>
                RM{" "}
                <span className="text-lg font-bold">
                  {getTotalRevenue() == undefined ? "-" : getTotalRevenue()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carbon Footprint</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingCarbonFootprintByPlantIdData ? (
              <div>Loading...</div>
            ) : carbonFootprintByPlantIdError ? (
              <div>Something went wrong!</div>
            ) : (
              <div className="space-y-2">
                <div className="bg-emerald-400 dark:text-black p-2 rounded-xl">
                  2023 Target Net Zero: {TARGET_NET_ZERO}GW
                </div>

                <div className="bg-green-200 dark:text-black p-2 rounded-xl">
                  {/* Current contribution to Net Zero: 0.5% */}
                  Current contribution to Net Zero:{" "}
                  {getCurrentNetZeroContribution()}%
                  <Progress value={getCurrentNetZeroContribution()} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
