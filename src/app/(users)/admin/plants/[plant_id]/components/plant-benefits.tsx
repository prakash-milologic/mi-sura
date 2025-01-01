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

export default function PlantBenefits({ data }: { data: any[] }) {
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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Environmental & Economic Benefits</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-400 space-y-3 2xl:space-y-0 2xl:gap-y-4 2xl:grid 2xl:grid-cols-2">
        <div className="flex items-center space-x-5">
          <EggFried size={30} className="text-primary" />
          <div>
            <div>Standard Coal Saved</div>
            <div className="text-foreground-600 text-xl font-bold">
              {getCoalSaved() == undefined ? "--" : getCoalSaved()}{" "}
              <span className="text-base font-normal">t</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <Cloud size={30} className="text-primary" />
          <div>
            <div>
              CO<sub>2</sub> Emission Reduction
            </div>
            <div className="text-foreground-600 text-xl font-bold">
              {getCarbonEmissionSaved() == undefined
                ? "--"
                : getCarbonEmissionSaved()}{" "}
              <span className="text-base font-normal">t</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <Trees size={30} className="text-primary" />
          <div>
            <div>Trees Planted</div>
            <div className="text-foreground-600 text-xl font-bold">
              {getTreesPlantedEquivalent() == undefined
                ? "--"
                : getTreesPlantedEquivalent()}{" "}
              <span className="text-base font-normal">Trees</span>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center space-x-5">
          <BadgeJapaneseYen size={30} className="text-primary-500" />
          <div>
            <div>Total Yields</div>
            <div className="text-foreground-600 text-xl font-bold">--</div>
          </div>s
        </div> */}
      </CardContent>
    </Card>
  );
}
