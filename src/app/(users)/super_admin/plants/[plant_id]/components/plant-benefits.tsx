import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import {
  BadgeJapaneseYen,
  BarChart4,
  CircleDollarSign,
  Cloud,
  Coins,
  EggFried,
  Trees,
} from "lucide-react";
import InverterRankingsTable from "./inverter-rankings-table";
import colors from "tailwindcss/colors";
import CardLayout from "../../../dashboard/_components/card-layout";
import { CarbonEmission, CoalSaved, CoalSavedIcon, TreeSaved } from "@/app/assets/SVGCollection";
import { useTheme } from "next-themes";

export default function PlantBenefits({ data }: { data: any[] }) {
  const {theme} = useTheme();
  // based on formula given by mimos
  function getCarbonEmissionSaved() {
    let totalPowerYield = data?.[0]?.tpy;
    let energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    let result = (totalPowerYield * energyCommission) / 10;
    return Math.floor(result * 100) / 100;
  }

  // based on formula given by mimos
  function getTreesPlantedEquivalent() {
    let carbonEmissionSaved = getCarbonEmissionSaved();
    let yearlyAvgCarbonEmission = 0.04; // static value  given by mimos
    let result = carbonEmissionSaved / yearlyAvgCarbonEmission;
    return Math.floor(result * 100) / 100;
  }

  // mimic carbon emission formula (unable to found formula given by mimos)
  function getCoalSaved() {
    let totalPowerYield = data?.[0]?.tpy;
    let petrol = 2.3228;
    let diesel = 2.7325;
    let coalCommission = petrol + diesel - 0.5;
    let result = (totalPowerYield * coalCommission) / 10;
    return Math.floor(result * 100) / 100;
  }

    const benifits = [
      {
        title: "Standard Coal Saved",
        value: getCoalSaved() + " tons",
        icon: <CoalSavedIcon  isDark = {theme == "dark" ? true : false}  />,
      },
      {
        title: "CO2 Emission Reduction",
        value: getCarbonEmissionSaved() + " tons",
        icon: <CoalSaved isDark = {theme == "dark" ? true : false}  />,
      },
      {
        title: "Trees Planted",
        value: getTreesPlantedEquivalent(),
        icon:  <TreeSaved isDark = {theme == "dark" ? true : false}  />,
      },
    ];

  return (
    // <Card className="h-full">
    //   <CardHeader>
    //     <CardTitle>Environmental & Economic Benefits</CardTitle>
    //   </CardHeader>
    //   <CardContent className="text-gray-400 space-y-3 2xl:space-y-0 2xl:gap-y-4 2xl:grid 2xl:grid-cols-2">
    //     <div className="flex items-center space-x-5">
    //       <EggFried size={30} className="text-primary" />
    //       <div>
    //         <div>Standard Coal Saved</div>
    //         <div className="text-foreground-600 text-xl font-bold">
    //           {getCoalSaved() == undefined ? "--" : getCoalSaved()}{" "}
    //           <span className="text-base font-normal">t</span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex items-center space-x-5">
    //       <Cloud size={30} className="text-primary" />
    //       <div>
    //         <div>
    //           CO<sub>2</sub> Emission Reduction
    //         </div>
    //         <div className="text-foreground-600 text-xl font-bold">
    //           {getCarbonEmissionSaved() == undefined
    //             ? "--"
    //             : getCarbonEmissionSaved()}{" "}
    //           <span className="text-base font-normal">t</span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex items-center space-x-5">
    //       <Trees size={30} className="text-primary" />
    //       <div>
    //         <div>Trees Planted</div>
    //         <div className="text-foreground-600 text-xl font-bold">
    //           {getTreesPlantedEquivalent() == undefined
    //             ? "--"
    //             : getTreesPlantedEquivalent()}{" "}
    //           <span className="text-base font-normal">Trees</span>
    //         </div>
    //       </div>
    //     </div>
 
    //   </CardContent>
    // </Card>

    <CardLayout title="Environmental Benefits" className="rounded-2xl dark:bg-[#262629] h-full " >
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-1 gap-4">
          {
            benifits.map((item, index) => (
              <div key={index} className="flex items-center  px-6 gap-6 mb-4 py-6 bg-[#F9FAFB] dark:bg-[#333338] rounded-2xl">
                {item.icon}
                <div>
                  <p className="text-xl xl:text-[32px] font-semibold text-[#171717] dark:text-white">{item.value}</p>
                  <p className="text-xs xl:text-sm font-medium text-[#686868] dark:text-[#FFFFFFBF] mt-1">{item.title}</p>
                </div>
              </div>
            ))
          }
          </div>

    </CardLayout>
  );
}
