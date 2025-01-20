"use client";
import React from "react";
import {
  Card
} from "@/components/ui/card";
import Image from "next/image";
import "./loading.css";
import PlantBenefits from "./plant-benefits";
import PlantHistory from "./plant-history";
import PlantLocation from "./plant-location";
import PlantPlannedProduction from "./plant-planned-production";
import PlantProduction from "./plant-production";
import PlantSubsystem from "./plant-sub-system";
import PlantSystemSummary from "./plant-system-summary";
import PlantWeather from "./plant-weather";
import PlantWorkOrder from "./plant-work-order";
import { ConnectionIcon, DailyYieldIcon } from "@/app/assets/SVGCollection";
import ProductionCard from "../../../dashboard/_components/production-card";
import CardLayout from "../../../dashboard/_components/card-layout";
import CardRevenue from "../../../dashboard/_components/card-revenue";
import { useParams } from "next/navigation";
import PowerTypes from "./power-types";

export default function PlantContent({ data }: { data: any[] }) {
  const { plant_id } = useParams<{ plant_id: string }>();
  function getPowerYield(field: "dpy" | "mpy" | "tpy") {
    if (field === "tpy") {
      let powerYield = data?.[0]?.[field];
      return Math.floor(powerYield * 12 * 1000) / 1000; // 12 is static value
    }

    let powerYield = data?.[0]?.[field];
    return Math.floor(powerYield * 1000) / 1000;
  }

  function getProduction() {
    let production = data?.[0]?.ap;
    return Math.floor(Number(production) * 100) / 100;
  }

  function getCapacity() {
    let capacity = data?.[0]?.capacity;
    return Math.floor(Number(capacity) * 100) / 100;
  }

  function getPower() {
    let production = getProduction();
    let capacity = getCapacity();
    return capacity / production;
  }
  interface ProductionCardProps {
    title: string;
    content: string;
    className: string;
    icon?: React.ReactNode;
    hideFooter?: boolean;
    titleStyle?: string;
    contentStyle?: string;
    descTitle?: string;
    descContent?: string;
    chipcolor?: string;
  }

  const productionCardDetails: ProductionCardProps[] = [
    {
      title: "Real-time Power",
      content: getProduction() == undefined ? "N/A" : getProduction() + " kW",
      className: "bg-[#F9FAFB] p-6  dark:bg-[#333338]  text-[#171717] dark:text-white",
      hideFooter: true,
      contentStyle: "text-2xl md:text-[32px] ",
      icon: <DailyYieldIcon width="48px" height="65px" />,
    },
    {
      title: "Installed Power",
      content: getCapacity() == undefined ? "N/A" : getCapacity() + " kWp",
      className: "bg-[#F9FAFB] p-6  dark:bg-[#333338]  text-[#171717] dark:text-white",
      hideFooter: true,
      contentStyle: "text-2xl md:text-[32px] ",
      icon: <ConnectionIcon width={48} height={65} />,
    },
  ];

  const productionCardItems: ProductionCardProps[] = [
    {
      title: "Current Power",
      content: 425 + " kW",
      descTitle: "Total",
      descContent: 543 + " kW",
      className: "bg-white dark:bg-[#3FC43A1A] p-3 col-span-5 ",
      chipcolor: "bg-[#058DF7] ",
      contentStyle: "md:text-base lg:text-xl text-xs ",
      titleStyle: "text-xs lg:text-xs text-[#171717CC] dark:text-[#FFFFFFBF]",
    },
    {
      title: "Daily  Yield",
      content: 240 + " kWh",
      descTitle: "Monthly",
      descContent: 325 + " kW",
      className: "bg-white dark:bg-[#3FC43A1A] p-3 col-span-5 ",
      chipcolor: "bg-[#FDB216]",
      contentStyle: " md:text-base lg:text-xl text-xs ",
      titleStyle: "text-xs lg:text-xs text-[#171717CC] dark:text-[#FFFFFFBF]",


    },
    {
      title: "Daily Revenue",
      content: 650 + " MYR",
      descTitle: "Total",
      descContent: 12463 + " MYR",
      className: "bg-white dark:bg-[#3FC43A1A] p-3 col-span-4 ",
      chipcolor: "bg-[#D55BC9]",
      contentStyle: " md:text-base lg:text-xl text-xs  ",
      titleStyle: "text-xs lg:text-xs text-[#171717CC] dark:text-[#FFFFFFBF]",


    },
  ];




  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-7 gap-6 mt-6">
        <div className="col-span-1 lg:col-span-3">
          <PlantLocation />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-1 xl:grid-cols-2  gap-4">
            {
              productionCardDetails.map((card, index) => (
                <PowerTypes
                  key={index}
                  title={card.title}
                  content={card.content}
                  icon={card.icon ?? ""}
                />
              ))
            }
          </div>
          <CardLayout hidePadding={true} title="Device Metrics" className="rounded-2xl dark:bg-[#262629]  mt-6   justify-center items-center h-fit max-h-[500px] " >
            <div className="grid grid-cols-1  gap-2">

              <div className="flex gap-4 p-4 bg-[#0098480D] dark:bg-[#3FC43A14] rounded-xl w-fit  xl:w-full xl:justify-around">
                <div className="flex flex-col gap-2  justify-center">
                  <p className="text-xl font-semibold text-[#171717] dark:text-white">Sungrow3</p>
                  <div className="flex  gap-2 items-center justify-start text-[#3FC43A]">
                    <div className={`w-2 h-2 rounded-full bg-[#3FC43A] `}></div><span>Active</span>
                  </div>
                </div>
                <div className="flex  gap-6  dark:text-white">
                  {
                    productionCardItems.map((card, index) => (
                      <ProductionCard
                        key={index}
                        title={card.title}
                        content={card.content}
                        className={card.className}
                        // icon={card.icon ?? ""}
                        contentStyle={card.contentStyle ?? ""}
                        descTitle={card.descTitle ?? ""}
                        descContent={card.descContent ?? ""}
                        chipColor={card.chipcolor ?? ""}
                        titleStyle={card.titleStyle ?? ""}
                      />
                    ))
                  }
                </div>

              </div>
              <div className="flex gap-4 p-4 bg-[#0098480D] dark:bg-[#3FC43A14] rounded-xl w-fit  xl:w-full xl:justify-around">
                <div className="flex flex-col gap-2  justify-center">
                  <p className="text-xl font-semibold text-[#171717] dark:text-white">Sungrow3</p>
                  <div className="flex  gap-2 items-center justify-start text-[#3FC43A]">
                    <div className={`w-2 h-2 rounded-full bg-[#3FC43A] `}></div><span>Active</span>
                  </div>
                </div>
                <div className="flex  gap-6  dark:text-white">
                  {
                    productionCardItems.map((card, index) => (
                      <ProductionCard
                        key={index}
                        title={card.title}
                        content={card.content}
                        className={card.className}
                        // icon={card.icon ?? ""}
                        contentStyle={card.contentStyle ?? ""}
                        descTitle={card.descTitle ?? ""}
                        descContent={card.descContent ?? ""}
                        chipColor={card.chipcolor ?? ""}
                        titleStyle={card.titleStyle ?? ""}
                      />
                    ))
                  }
                </div>

              </div>
              <div className="flex gap-4 p-4 bg-[#0098480D] dark:bg-[#3FC43A14] rounded-xl w-fit  xl:w-full xl:justify-around">
                <div className="flex flex-col gap-2  justify-center">
                  <p className="text-xl font-semibold text-[#171717] dark:text-white">Sungrow3</p>
                  <div className="flex  gap-2 items-center justify-start text-[#3FC43A]">
                    <div className={`w-2 h-2 rounded-full bg-[#3FC43A] `}></div><span>Active</span>
                  </div>
                </div>
                <div className="flex  gap-6  dark:text-white">
                  {
                    productionCardItems.map((card, index) => (
                      <ProductionCard
                        key={index}
                        title={card.title}
                        content={card.content}
                        className={card.className}
                        // icon={card.icon ?? ""}
                        contentStyle={card.contentStyle ?? ""}
                        descTitle={card.descTitle ?? ""}
                        descContent={card.descContent ?? ""}
                        chipColor={card.chipcolor ?? ""}
                        titleStyle={card.titleStyle ?? ""}
                      />
                    ))
                  }
                </div>

              </div>
              <div className="flex gap-4 p-4 bg-[#0098480D] dark:bg-[#3FC43A14] rounded-xl w-fit  xl:w-full xl:justify-around">
                <div className="flex flex-col gap-2  justify-center">
                  <p className="text-xl font-semibold text-[#171717] dark:text-white">Sungrow3</p>
                  <div className="flex  gap-2 items-center justify-start text-[#3FC43A]">
                    <div className={`w-2 h-2 rounded-full bg-[#3FC43A] `}></div><span>Active</span>
                  </div>
                </div>
                <div className="flex  gap-6  dark:text-white">
                  {
                    productionCardItems.map((card, index) => (
                      <ProductionCard
                        key={index}
                        title={card.title}
                        content={card.content}
                        className={card.className}
                        // icon={card.icon ?? ""}
                        contentStyle={card.contentStyle ?? ""}
                        descTitle={card.descTitle ?? ""}
                        descContent={card.descContent ?? ""}
                        chipColor={card.chipcolor ?? ""}
                        titleStyle={card.titleStyle ?? ""}
                      />
                    ))
                  }
                </div>

              </div>
           
           
            </div>

          </CardLayout>
        </div>
      </div>

      <div className="grid col-span-1 lg:grid-cols-3 gap-6 mt-6 pb-6">

        <div className="col-span-1 lg:col-span-2">
          <CardRevenue title="History" type="area" api={`/api/tsdb/plant_data/${plant_id}/bucketed_power_yield`} classNames="p-0" />
        </div>
        <div className="col-span-1">
          <PlantWeather />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <PlantSubsystem data={data} />
        </div>
        <div className="col-span-1">
          <PlantSystemSummary />
        </div>

        <div className="col-span-1">
          <PlantBenefits data={data} />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <CardRevenue title="Real-time Revenue" type="bar" api={`/api/tsdb/plant_data/${plant_id}/bucketed_power_yield`} classNames="p-0" />
        </div>
      </div>

      {/* <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        <div className="col-span-4">
          <Card>
            <div className="grid grid-cols-7 gap-4 pt-6 rounded-xl">
              <div className="col-start-2 col-span-4 pr-2">
                <div className="flex content-center items-start p-8">
                  <div className="text-2xl font-semibold justify-self-center p-2	">
                    Status:
                  </div>
                  <div className="bg-green-100 rounded-lg flex flex-row p-2 shadow-xl shadow-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="green"
                      className="w-7 h-7 justify-self-center	"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="text-xl justify-self-center ml-2	">Normal</div>
                  </div>
                </div>

                <Image
                  src="/img_0.png"
                  alt="Vercel Logo"
                  className="dark:invert  "
                  width={180}
                  height={240}
                  priority
                />
              </div>

              <div className="col-start-4 col-end-6  font-sans col-span-1">
                <div className="flex flex-row">
                  <div className="ml-4">
                    <div className="text-3xl text-slate-600">Real-time Power</div>
                    <div className="pt-2 flex flex-row justify-self-center">
                      <div className="text-3xl font-bold underline decoration-dotted ">
                        {getProduction()}{" "}
                      </div>
                      <div className="text-2xl font-semibold self-end pl-2">
                        kW
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-start-6 col-end-8  font-sans col-span-1">
                <div className="flex flex-row">
                  <div className="ml-4">
                    <div className="text-3xl text-slate-600">Installed Power</div>
                    <div className="pt-2 flex flex-row justify-self-center">
                      <div className="text-3xl font-bold underline decoration-dotted ">
                        {getCapacity()}{" "}
                      </div>
                      <div className="text-2xl font-semibold self-end pl-2">
                        kWp
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Image
                src="/img_1.png"
                alt="Vercel Logo"
                className="dark:invert col-start-1 col-end-3 pl-6 pt-6"
                width={180}
                height={240}
                priority
              />
              <div className="dark:invert col-end-4 col-span-1 pb-6 mb-2 ">
                <div className="flex flex-row">
                  <Image
                    src="/img_3.png"
                    alt="Vercel Logo"
                    className="dark:invert col-end-4 col-span-1 pb-6 mb-2 "
                    width={98}
                    height={10}
                    priority
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <PlantLocation />
        </div>

        <div className="col-span-2">
          <PlantProduction data={data} />
        </div>

        <div className="lg:col-span-3 2xl:col-span-1">
          <PlantWeather />
        </div>

        <div className="col-span-4">
          <PlantHistory />
        </div>

        <div className="col-span-4">
          <PlantSubsystem data={data} />
        </div>
        <div className="col-span-4">
          <PlantPlannedProduction />
        </div>

        <div className="col-span-2">
          <PlantBenefits data={data} />
        </div>

        <div className="col-span-2">
          <PlantWorkOrder />
        </div>

        <div className="col-span-4">
          <PlantSystemSummary />
        </div>
      </div> */}
    </>

  );
}
