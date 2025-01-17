import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { TreePine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartRevenue from "./chart-revenue";
import { cn } from "@/lib/utils";

interface CardRevenueProps {
  title: string;
  api?: string;
  type:"area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
  classNames?: string;
}

const impacts = [
  {
    title: "Trees Planted Equivalent",
    description: "Trees planted info will be here",
    value: 1.09,
    unitValue: "HA",
    icon: <TreePine />,
  },
  {
    title: "Trees Planted Equivalent",
    description: "Trees planted info will be here",
    value: 1.09,
    unitValue: "HA",
    icon: <TreePine />,
  },
  {
    title: "Trees Planted Equivalent",
    description: "Trees planted info will be here",
    value: 1.09,
    unitValue: "HA",
    icon: <TreePine />,
  },
];



export default function CardRevenue({ title, api, type="bar",classNames = "" }: CardRevenueProps) {
  return (
    <Card shadow="sm" className={cn("p-6",classNames)}>
      <Tabs defaultValue="monthly">
        <CardHeader className="border-b-1 p-6">
          <div className="space-y-5 sm:space-y-0 sm:flex items-center justify-between w-full">
            <div>
              <p className="text-lg md:text-xl font-semibold">{title}</p>
            </div>
            <div>
              <TabsList className="grid w-full grid-cols-3 gap-2 bg-transparent">
                <TabsTrigger  className=" dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848] "   value="daily">Daily</TabsTrigger>
                <TabsTrigger  className=" dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848] "  value="monthly">Monthly</TabsTrigger>
                <TabsTrigger  className=" dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848] "  value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0 m-0">
          <TabsContent value="daily">
            <div className="h-[390px]">
              <ChartRevenue period="daily" api={api} chartType={type} />
            </div>
          </TabsContent>
          <TabsContent value="monthly">
            <div className="h-[390px]">
              <ChartRevenue period="monthly" api={api} chartType={type} />
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="h-[390px]">
              <ChartRevenue period="yearly" api={api} chartType={type} />
            </div>
          </TabsContent>
        </CardBody>

        <CardFooter>
        </CardFooter>
      </Tabs>
    </Card>
  );
}