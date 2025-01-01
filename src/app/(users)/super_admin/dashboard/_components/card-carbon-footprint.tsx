import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import CarbonFootrpintChart from "./carbon-footprint-chart";

function fetchCarbonFootprintData() {
  return axios.get(`/api/tsdb/carbon_footprint`);
}

export default function CardCarbonFootprint() {
  const {
    data: carbonFootprintData,
    isLoading: isLoadingCarbonFootprintData,
    error: carbonFootprintError,
  } = useQuery({
    queryKey: ["carbon_footprint_data"],
    queryFn: fetchCarbonFootprintData,
    refetchInterval: 30000,
  });

  const TARGET_NET_ZERO = 7; // (GW) statically determined based on target net zero of 2030

  function getCurrentNetZeroContribution() {
    let totalPowerYield = carbonFootprintData?.data?.[0]?.tpy; // KW
    if (!totalPowerYield) return undefined;

    let convertedPower = totalPowerYield * 0.000001; // convert from KW to GW
    let result = convertedPower / TARGET_NET_ZERO;
    return Math.floor(result * 100) / 100;
  }

  return (
    <>
    <CarbonFootrpintChart
    closedValue={getCurrentNetZeroContribution() || 0}
    openValue={TARGET_NET_ZERO || 0}
    closedValueLabel="Current Contribution to Net Zero"
    openValueLabel="Target Net Zero"
    />
    
    </>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Carbon Footprint</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     {isLoadingCarbonFootprintData ? (
    //       <div>Loading...</div>
    //     ) : carbonFootprintError ? (
    //       <div>Something went wrong!</div>
    //     ) : (
    //       <div className="space-y-2">
    //         <div className="bg-emerald-400 dark:text-black p-2 rounded-xl">
    //           2023 Target Net Zero: {TARGET_NET_ZERO}GW
    //         </div>

    //         <div className="bg-green-200 dark:text-black p-2 rounded-xl">
    //           {/* Current contribution to Net Zero: 0.5% */}
    //           Current contribution to Net Zero:{" "}
    //           {getCurrentNetZeroContribution()
    //             ? getCurrentNetZeroContribution() + "%"
    //             : "N/A"}
    //           <Progress value={getCurrentNetZeroContribution()} />
    //         </div>
    //       </div>
    //     )}
    //   </CardContent>
    // </Card>
  );
}
