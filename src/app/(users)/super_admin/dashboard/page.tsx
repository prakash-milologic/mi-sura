"use client";
import { August, CarbonEmission, CoalSaved, DailyYieldIcon, July, June, November, October, September, TreeSaved } from "@/app/assets/SVGCollection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTheme } from "next-themes";
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import CardCarbonFootprint from "./_components/card-carbon-footprint";
import CardLayout from "./_components/card-layout";
import CardRevenue from "./_components/card-revenue";
import IconWithText from "./_components/icon-with-text";
import PlantListCard from "./_components/plant-list-card";
import ProductionCard from "./_components/production-card";

function fetchDailyInverterData() {
  return axios.get(`/api/tsdb/daily_inverter_data`);
}

function fetchSumDailyPowerYield() {
  return axios.get(`/api/tsdb/sum_daily_power_yield`);
}

export default function DashboardPage() {
  const { data: dailyInverterData, isLoading: isLoadingDailyInverterData } =
    useQuery({
      queryKey: ["daily_inverter_data"],
      queryFn: fetchDailyInverterData,
      refetchInterval: 30000,
    });

  console.log(dailyInverterData);

  function getActivePower() {
    let activePower = dailyInverterData?.data?.[0]?.ap;
    return Math.floor(activePower * 1000) / 1000;
  }

  function getInstalledCapacity() {
    let capacity = dailyInverterData?.data?.[0]?.capacity;
    return Math.floor(capacity * 1000) / 1000;
  }

  function getDailyPowerYield() {
    let dailyPowerYield = dailyInverterData?.data?.[0]?.dpy;
    return Math.floor(Number(dailyPowerYield) * 1000) / 1000;
  }

  function getMonthlyPowerYield() {
    let monthlyPowerYield = dailyInverterData?.data?.[0]?.mpy;
    return Math.floor(Number(monthlyPowerYield) * 1000) / 1000;
  }

  function getDailyRevenue() {
    let dailyPowerYield = getDailyPowerYield();
    let tariff = 0.57; // static value refer to tariff given by mimos
    let dailyRevenue = Math.floor(dailyPowerYield * tariff * 1000) / 1000;
    return dailyRevenue;
  }

  function getMonthlyRevenue() {
    let monthlyPowerYield = getMonthlyPowerYield();
    let tariff = 0.57; // static value refer to tariff given by mimos
    let monthlyRevenue = Math.floor(monthlyPowerYield * tariff * 1000) / 1000;
    return monthlyRevenue;
  }

  const plantInfo = {
    active: dailyInverterData?.data?.[0]?.activePlant,
    total: dailyInverterData?.data?.[0]?.totalPlant,
  };

  // based on formula given by mimos
  function getCarbonEmissionSaved() {
    let totalPowerYield = dailyInverterData?.data?.[0]?.tpy;
    let energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    let result = (totalPowerYield * energyCommission) / 10;
    return result;
  }

  // based on formula given by mimos
  function getTreesPlantedEquivalent() {
    let carbonEmissionSaved = getCarbonEmissionSaved();
    let yearlyAvgCarbonEmission = 0.04; // static value  given by mimos
    let result = carbonEmissionSaved / yearlyAvgCarbonEmission;
    return result;
  }

  // mimic carbon emission formula (unable to found formula given by mimos)
  function getCoalSaved() {
    let totalPowerYield = dailyInverterData?.data?.[0]?.tpy;
    let petrol = 2.3228;
    let diesel = 2.7325;
    let coalCommission = petrol + diesel - 0.5;
    let result = (totalPowerYield * coalCommission) / 10;
    return result;
  }
  if (isLoadingDailyInverterData) {
    return (
      <div className="px-6 mt-20 text-white absolute grid grid-cols-1 xl:grid-cols-4 gap-5">
        Loading...
      </div>
    );
  }

  interface ProductionCardProps {
    title: string;
    content: string;
    descTitle: string;
    descContent: string;
    className: string;
    chipcolor: string;
    icon?: React.ReactNode;
    imageSrc?: string;
  }
  const productionCardDetails: ProductionCardProps[] = [
    {
      title: "Current Power",
      content: getActivePower() == undefined ? "N/A" : getActivePower() + " kW",
      descTitle: "Installed Capacity",
      descContent: getInstalledCapacity() == undefined ? "N/A" : getInstalledCapacity() + " kW",
      className: "bg-[#F9FAFB] p-6 col-span-5 dark:bg-[#333338]",
      chipcolor: "bg-[#058DF7] ",
    },
    {
      title: "Daily  Yield",
      content: getDailyPowerYield() == undefined ? "N/A" : getDailyPowerYield() + " kWh",
      descTitle: "Monthly Power Yield",
      descContent: getMonthlyPowerYield() == undefined ? "N/A" : getMonthlyPowerYield() + " kWh",
      className: "bg-[#F9FAFB] p-6 col-span-5 dark:bg-[#333338]",
      chipcolor: "bg-[#FDB216]",
      icon: <DailyYieldIcon />
    },
    {
      title: "Daily Revenue",
      content: getDailyRevenue() == undefined ? "N/A" : getDailyRevenue() + " MYR",
      descTitle: "Monthly Revenue",
      descContent: getMonthlyRevenue() == undefined ? "N/A" : getMonthlyRevenue() + " MYR",
      className: "bg-[#F9FAFB] p-6 col-span-4 dark:bg-[#333338]",
      chipcolor: "bg-[#D55BC9]"
    },
    {
      title: "Active Plant",
      content: `${plantInfo.active} Plant${plantInfo.active > 1 ? "s" : ""}`,
      descTitle: "Total Plant",
      descContent: `${plantInfo.total} Plant${plantInfo.total > 1 ? "s" : ""}`,
      className: "bg-[#F9FAFB] p-6 col-span-6 row-span-2 dark:bg-[#333338] ",
      chipcolor: "bg-[#00E397]",
      imageSrc: '/solar-panel.png'
    },
    {
      title: "Daily Revenue",
      content: getDailyRevenue() == undefined ? "N/A" : getDailyRevenue() + " MYR",
      descTitle: "Monthly Revenue",
      descContent: getMonthlyRevenue() == undefined ? "N/A" : getMonthlyRevenue() + " MYR",
      className: "bg-[#F9FAFB] p-6 col-span-4 dark:bg-[#333338] ",
      chipcolor: "bg-[#FD686A]"
    }

  ];
  const {theme} = useTheme();


  const impacts = [
    {
      title: "Carbon Emissions Saved",
      value: getCarbonEmissionSaved(),
      unitValue: "Tons",
      icon: <CarbonEmission isDark = {theme == "dark" ? true : false}  />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
    },
    {
      title: "Coal Saved",
      value: getCoalSaved(),
      unitValue: "Tons",
      icon: <CoalSaved isDark = {theme == "dark" ? true : false}  />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
    },
    {
      title: "Trees Planted",
      value: getTreesPlantedEquivalent(),
      unitValue: "Trees",
      icon: <TreeSaved isDark = {theme == "dark" ? true : false}  />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
    }
  ];

  const monthlyGeneration = [
    {

      value: 280,
      unitValue: "kWh",
      icon: <June isDark = {theme == "dark" ? true : false} />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
      headerText: "Jun"
    },
    {
      value: 301,
      unitValue: "kWh",
      icon: <July isDark = {theme == "dark" ? true : false} />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
      headerText: "Jul"

    },
    {
      value: 189,
      unitValue: "kWh",
      icon: <August isDark = {theme == "dark" ? true : false} />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
      headerText: "Aug"

    },
    {
      value: 243,
      unitValue: "kWh",
      icon: <September isDark = {theme == "dark" ? true : false} />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
      headerText: "Sept"

    },
    {
      value: 190,
      unitValue: "kWh",
      icon: <October isDark = {theme == "dark" ? true : false} />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
      headerText: "Oct"

    },
    {
      value: 164,
      unitValue: "kWh",
      icon: <November isDark = {theme == "dark" ? true : false} />,
      className: "bg-[#F9FAFB] py-6 dark:bg-[#333338]",
      headerText: "Nov"

    },

  ];

  const GenerationCount = [
    {
      title: "Maximum Generation",
      value: "October 301 kWh",
    },
    {
      title: "Minimum Generation",
      value: "November 164 kWh",
    },
    {
      title: "Total Generation",
      value: "318 kWh",
    }
  ]


  return (
    <div className="px-8  pb-20 dark:bg-[#0B0A08]">
      <div className="grid grid-cols-1 xl:grid-cols-7 gap-7 mt-6">
        <div className="col-span-4">
          <CardLayout title="Production Overview" content="Updated 10mins ago" className="rounded-2xl dark:bg-[#262629] " >
            <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 dark:text-white">
              {
                productionCardDetails.map((card, index) => (
                  <ProductionCard
                    key={index}
                    title={card.title}
                    content={card.content}
                    descTitle={card.descTitle}
                    descContent={card.descContent}
                    className={card.className}
                    chipColor={card.chipcolor}
                    imageSrc={card.imageSrc ?? ""}
                    icon={card.icon ?? ""}
                  />
                ))
              }
            </div>
          </CardLayout>
          <CardLayout title="Environmental Impacts" content="" className="rounded-2xl mt-6" >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 justify-center items-center">
              {
                impacts.map((impact, index) => (
                  <IconWithText
                    key={index}
                    title={impact.title}
                    value={impact.value}
                    unitValue={impact.unitValue}
                    icon={impact.icon}
                    className={impact.className}
                  />
                ))
              }
            </div>
          </CardLayout>
        </div>
        <div className="col-span-3">
          <CardLayout title="Monthly Generation" content="" className="rounded-2xl" >
            <ReactSpeedometer
              // width={400}
              height={200}
              needleHeightRatio={0.6}
              value={777}
              currentValueText=""
              customSegmentLabels={[
                {
                  text: 'Critical',
                  position: "OUTSIDE" as any,  
                  color: '#FF493F',
                },
                {
                  text: 'Low',
                  position: "OUTSIDE"  as any, 


                  color: '#ED8001',
                },
                {
                  text: 'Moderate',
                  position: "OUTSIDE" as any,

                  color: '#FDB216',
                  fontSize: '19px',
                },
                {
                  text: 'Good',
                  position: "OUTSIDE" as any,

                  color: '#00E397',
                },
                {
                  text: 'Excellent',
                  position: "OUTSIDE" as any, 

                  color: '#3FC43A',
                },
              ]}
              ringWidth={48}
              needleTransitionDuration={3333}
              needleColor={'#90f2ff'}
              textColor={'#d8dee9'}
            />

          </CardLayout>
          <CardLayout title="Monthly Generation" content="" className="rounded-2xl mt-6" >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 justify-center items-center">
              {
                monthlyGeneration.map((impact, index) => (
                  <IconWithText
                    key={index}
                    value={impact.value}
                    unitValue={impact.unitValue}
                    icon={impact.icon}
                    headerText={impact.headerText}
                    className={impact.className}
                  />
                ))
              }
            </div>
            <div className="mt-4 mb-4">
              {
                GenerationCount.map((impact, index) => (
                  <div key={index} className={`flex  justify-between py-4 items-center ${index !== GenerationCount.length - 1 ? "border-b dark:border-b-[#FFFFFF1A] border-[#1717171A]" : ""}`}>
                    <p className="text-sm text-[#686868] font-medium dark:text-[#FFFFFFCC]">{impact.title}</p>
                    <p className="text-base text-[#171717] font-medium dark:text-[#FFFFFFCC]">{impact.value}</p>
                  </div>
                ))
              }
            </div>
          </CardLayout>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <CardRevenue title="Energy Generated" type="area" api="" />
        <CardRevenue title="Real-time Revenue" type="bar" api="" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <CardLayout title="Carbon Footprint" className="rounded-2xl" >
          <CardCarbonFootprint />
        </CardLayout>

        <PlantListCard />
      </div>
      {/* 
      <div className=" grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 xl:h-[500px]">
          <CardInfo
            title="Current Power"
            content={
              getActivePower() == undefined ? "N/A" : getActivePower() + " kW"
            }
            descTitle="Installed Capacity"
            descContent={
              getInstalledCapacity() == undefined
                ? "N/A"
                : getInstalledCapacity() + " kW"
            }
          />
          <CardInfo
            title="Daily Yield"
            content={
              getDailyPowerYield() == undefined
                ? "N/A"
                : getDailyPowerYield() + " kWh"
            }
            descTitle="Monthly Yield"
            descContent={
              getMonthlyPowerYield() == undefined
                ? "N/A"
                : getMonthlyPowerYield() + " kWh"
            }
          />
          <CardInfo

            title="Daily Revenue"
            content={
              getDailyRevenue() == undefined ? "N/A" : getDailyRevenue() + " MYR"
            }
            descTitle="Monthly Revenue"
            descContent={
              getMonthlyRevenue() == undefined
                ? "N/A"
                : getMonthlyRevenue() + " MYR"
            }
          />
          <CardInfo
            title="Active Plant"
            className="row-span-2"
            content={`${plantInfo.active} Plant${plantInfo.active > 1 ? "s" : ""
              }`}
            descTitle="Total Plant"
            descContent={`${plantInfo.total} Plant${plantInfo.total > 1 ? "s" : ""
              }`}
          />

        </div>
        <div className="col-span-2">
          <CardWatchList
            activePower={
              getActivePower() == undefined ? "N/A" : getActivePower() + " kW"
            }
          />
        </div>

        <div className="col-span-2 space-y-4">
          <CardEnvironmental impacts={impacts} />
          <CardCarbonFootprint />
        </div>
        <div className="col-span-2">
          <CardWeatherForecast />
        </div>
        <div className="col-span-3">
          <CardRevenue title="Energy Generated" type="area" api="" />
        </div>
        <div className="col-span-1">
          <PlantListCard />
        </div>
      </div> */}

    </div>
  );
}
