import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { BarChart4, CircleDollarSign, Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CardLayout from "../../../dashboard/_components/card-layout";
import { DoubleCoin, MultipleCoin, SingleCoin } from "@/app/assets/SVGCollection";
import CarbonFootrpintChart from "../../../dashboard/_components/carbon-footprint-chart";
import { useTheme } from "next-themes";

function fetchCarbonFootprintByPlantIdData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}/carbon_footprint`);
}

export default function PlantSubsystem({ data }: { data: any[] }) {
  const { plant_id } = useParams<{ plant_id: string }>();
  const {theme} = useTheme();

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
  const plantRevenue = [
    {
      title: "Today Revenue",
      value: getDailyRevenue() + " MYR",
      icon: <SingleCoin isDark = {theme == "dark" ? true : false}  />,
    },
    {
      title: "This Month",
      value: getMonthlyRevenue() + " MYR",
      icon: <DoubleCoin isDark = {theme == "dark" ? true : false}  />,
    },
    {
      title: "Lifetime",
      value: getTotalRevenue() + " MYR",
      icon: <MultipleCoin isDark = {theme == "dark" ? true : false}  />,
    },
  ];

  return (
    // <Card className="h-full">
    //   <CardHeader>
    //     <CardTitle>Subsystem</CardTitle>
    //   </CardHeader>
    //   <CardContent className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-5">
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Plant Revenue</CardTitle>
    //       </CardHeader>
    //       <CardContent className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3">
    //         <div className="flex flex-col items-center text-sm">
    //           <CircleDollarSign size={50} className="mb-3 text-success-400" />
    //           <div>Today</div>
    //           <div>
    //             RM{" "}
    //             <span className="text-lg font-bold">
    //               {getDailyRevenue() == undefined ? "-" : getDailyRevenue()}
    //             </span>
    //           </div>
    //         </div>

    //         <div className="flex flex-col items-center text-sm">
    //           <Coins size={50} className="mb-3 text-warning-400" />
    //           <div>This Month</div>
    //           <div>
    //             RM{" "}
    //             <span className="text-lg font-bold">
    //               {getMonthlyRevenue() == undefined ? "-" : getMonthlyRevenue()}
    //             </span>
    //           </div>
    //         </div>

    //         <div className="flex flex-col items-center text-sm">
    //           <BarChart4 size={50} className="mb-3 text-danger-400" />
    //           <div>Lifetime</div>
    //           <div>
    //             RM{" "}
    //             <span className="text-lg font-bold">
    //               {getTotalRevenue() == undefined ? "-" : getTotalRevenue()}
    //             </span>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>

    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Carbon Footprint</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         {isLoadingCarbonFootprintByPlantIdData ? (
    //           <div>Loading...</div>
    //         ) : carbonFootprintByPlantIdError ? (
    //           <div>Something went wrong!</div>
    //         ) : (
    //           <div className="space-y-2">
    //             <div className="bg-emerald-400 dark:text-black p-2 rounded-xl">
    //               2023 Target Net Zero: {TARGET_NET_ZERO}GW
    //             </div>

    //             <div className="bg-green-200 dark:text-black p-2 rounded-xl">
    //               {/* Current contribution to Net Zero: 0.5% */}
    //               Current contribution to Net Zero:{" "}
    //               {getCurrentNetZeroContribution()}%
    //               <Progress value={getCurrentNetZeroContribution()} />
    //             </div>
    //           </div>
    //         )}
    //       </CardContent>
    //     </Card>
    //   </CardContent>
    // </Card>
    <CardLayout title="Subsystem" className="rounded-2xl dark:bg-[#262629] mb-6 " >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="p-6 bg-[#F9FAFB] rounded-2xl dark:bg-[#3333384D]">
          <p className="text-sm xl:text-base font-semibold text-[#171717] dark:text-white mb-6">Plant Revenue</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-1 gap-4">
          {
            plantRevenue.map((item, index) => (
              <div key={index} className="flex items-center justify-evenly gap-6 mb-4 py-6 bg-white dark:bg-[#333338]">
                {item.icon}
                <div>
                  <p className="text-xl xl:text-[32px] font-semibold text-[#171717] dark:text-white">{item.value}</p>
                  <p className="text-xs xl:text-sm font-medium text-[#686868] mt-1 dark:text-white/75">{item.title}</p>
                </div>
              </div>
            ))
          }
          </div>
        </div>
        <div className="p-6 bg-[#F9FAFB] dark:bg-[#333338]">
          <p className="text-sm xl:text-base font-semibold text-[#171717] dark:text-white mb-6">Carbon Footprint</p>
          <div className=" h-[200px] sm:h-[200px] md:h-[200px] lg:h-[360px]">
          <CarbonFootrpintChart
            closedValue={getCurrentNetZeroContribution() || 0}
            openValue={TARGET_NET_ZERO || 0}
            closedValueLabel="Current Contribution to Net Zero"
            openValueLabel="Target Net Zero"
            isPlant = {true}
          />
          </div>
       
        </div>
      </div>

    </CardLayout>
  );
}
