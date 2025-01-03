"use client";
import { cn } from "@/lib/utils";
import { Chip } from "@nextui-org/react";
import axios from "axios";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import TemperatureBar from "./_components/Temperature";
import CardLayout from "../dashboard/_components/card-layout";
import ProductionCard from "../dashboard/_components/production-card";
import FilterByDevice from "./_components/FilterByDevice";

function fetchDailyInverterData() {
  return axios.get(`/api/tsdb/daily_inverter_data`);
}

function fetchSumDailyPowerYield() {
  return axios.get(`/api/tsdb/sum_daily_power_yield`);
}

export default function DashboardPage() {

const { theme, resolvedTheme } = useTheme();
const [textColor, setTextColor] = useState<string>("#000000");

useEffect(() => {
  if (resolvedTheme === "light") {
    setTextColor("#FFFFFF");
  } else {
    setTextColor("#000000");

  }
}, [resolvedTheme]);  // This ensures the effect is triggered whenever `resolvedTheme` changes.



  interface MetricProps {
    title: string;
    content: string;
    status: string;
    className: string;
    chipcolor: string;
    icon?: React.ReactNode;
    imageSrc?: string;
  }
  const inputMetrics: MetricProps[] = [
    {
      title: "Input Current",
      content: 18.8 + " A",
      status: "Normal",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4 dark:bg-[#333338]",
      chipcolor: "bg-[#3FC43A] text-white ",
    },
    {
      title: "Input Voltage",
      content: 580 + " V",
      status: "Moderate",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4 dark:bg-[#333338]",
      chipcolor: "bg-[#FDB216] text-white ",
    },
    {
      title: "Input Power",
      content: 9.72 + " kW",
      status: "Normal",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4 dark:bg-[#333338]",
      chipcolor: "bg-[#3FC43A] text-white ",
    },
  ];
  const outputMetrics: MetricProps[] = [
    {
      title: "Output Current",
      content: 17.5 + " A",
      status: "Moderate",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4  dark:bg-[#333338]",
      chipcolor: "bg-[#FDB216] text-white ",
    },
    {
      title: "Output Voltage",
      content: 415 + " V",
      status: "Normal",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4  dark:bg-[#333338]",
      chipcolor: "bg-[#3FC43A] text-white ",
    },
    {
      title: "Output Power",
      content: 2 + " kW",
      status: "Critical",
      className: "bg-[#FF493F] pt-6 px-6 pb-4   text-white",
      chipcolor: "bg-[#FFFFFF] text-[#FF493F] ",
    },
  ];

  const llcCurrents: MetricProps[] = [
    {
      title: "Current 1",
      content: 3.5 + " A",
      status: "Normal",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4  dark:bg-[#333338]",
      chipcolor: "bg-[#3FC43A] text-white ",
    },
    {
      title: "Current 2",
      content: 3.5 + " A",
      status: "Critical",
      className: "bg-[#FF493F] pt-6 px-6 pb-4   text-white",
      chipcolor: "bg-[#FFFFFF] text-[#FF493F] ",
    },
    {
      title: "Current 3",
      content: 3.5 + " A",
      status: "Normal",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4  dark:bg-[#333338]",
      chipcolor: "bg-[#3FC43A] text-white ",
    },
    {
      title: "Current 4",
      content: 3.5 + " A",
      status: "Moderate",
      className: "bg-[#F9FAFB] pt-6 px-6 pb-4  dark:bg-[#333338]",
      chipcolor: "bg-[#FDB216] text-white ",
    },
  ];


  return (
    <div className="px-2 pb-2 md:px-8 md:pb-20 ">
      <FilterByDevice />
      
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mt-6">
        <div className="col-span-3">
          <CardLayout title="Input Metrics" content="" className="rounded-2xl dark:bg-[#262629] " >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 dark:text-white">
              {
                inputMetrics.map((card, index) => (
                  <ProductionCard
                    key={index}
                    title={card.title}
                    content={card.content}
                    className={card.className}
                    chipColor={card.chipcolor}
                    itemStatus={card.status}
                  />
                ))
              }
            </div>
          </CardLayout>
          <CardLayout title="Output Metrics" content="" className="rounded-2xl dark:bg-[#262629] mt-6 " >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 dark:text-white">
              {
                outputMetrics.map((card, index) => (
                  <ProductionCard
                    key={index}
                    title={card.title}
                    content={card.content}
                    className={card.className}
                    chipColor={card.chipcolor}
                    itemStatus={card.status}
                  />
                ))
              }
            </div>
          </CardLayout>
          <CardLayout title="LLC Currents" content="" className="rounded-2xl dark:bg-[#262629] mt-6 " >
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 dark:text-white">
              {
                llcCurrents.map((card, index) => (
                  <ProductionCard
                    key={index}
                    title={card.title}
                    content={card.content}
                    className={card.className}
                    chipColor={card.chipcolor}
                    itemStatus={card.status}
                    isLLC={true}
                  />
                ))
              }
            </div>
          </CardLayout>

        </div>
        <div className="col-span-2 grid sm:grid-cols-1 xl:grid-cols-1 md:grid-cols-2 gap-6">
          <CardLayout title="DC Link Voltage" content="" className="rounded-2xl dark:bg-[#262629]" >
            <ReactSpeedometer
             key={resolvedTheme} 
              height={250}
              maxValue={600}
              value={480}
              startColor="#00E397"
              endColor="#EBEFF280"
              needleHeightRatio={0.4}
              ringWidth={40}
              needleTransitionDuration={3333}
              needleColor={'#90f2ff'}
              segments={2}
              textColor={textColor}
            />
            <hr className="mb-4 dark:border-[#333338]" />
            <div className="flex justify-center gap-6 items-center">
              <p className="text-4xl font-semibold ">480 V</p>
              <div className="h-8 w-[1px]  border bg-[#FFFFFF33] rounded-full xl:block hidden"></div>
              <div className="flex space-x-2 items-center ">
                <p className={`text-xs font-medium dark:text-[#FFFFFFBF]`}>
                  Status:
                </p>
                {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
                <Chip size="sm" className={cn('h-5', 'bg-[#3FC43A] text-white')} radius="sm">
                  <p className="font-medium text-white"> Normal</p>
                </Chip>
              </div>
            </div>
          </CardLayout>
          <CardLayout title="Internal Temperature" content="" className="rounded-2xl  sm:mt-6 xl:mt-0 md:mt-0  dark:bg-[#262629]" >
          <TemperatureBar value={60} min={0} max={100} />
          <hr className="mb-4 mt-4 dark:border-[#333338]" />
            <div className="flex justify-center gap-6 items-center">
              <p className="text-4xl font-semibold ">60 °C</p>
              <div className="h-8 w-[1px]  border bg-[#FFFFFF33] rounded-full xl:block hidden"></div>
              <div className="flex space-x-2 items-center ">
                <p className={`text-xs font-medium dark:text-[#FFFFFFBF]`}>
                  Status:
                </p>
                {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
                <Chip size="sm" className={cn('h-5', 'bg-[#3FC43A] text-white')} radius="sm">
                  <p className="font-medium text-white"> Normal</p>
                </Chip>
              </div>
            </div>
            </CardLayout>

        </div>
      </div>
    </div>
  );
}
