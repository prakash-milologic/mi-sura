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

const CardItem = ({
  data,
  enableDivider = false,
}: {
  data: any;
  enableDivider?: boolean;
}) => {
  return (
    <div className="grid grid-cols-5 gap-2 pt-2 items-center w-full">
      <div className="col-span-4 flex items-center space-x-4">
        {data.icon}
        <div>
          <p>{data.title}</p>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="col-span-1 flex justify-end">
        <p>
          {data.value} {data.unitValue}
        </p>
      </div>

      <div className="col-span-5">{enableDivider ? <Divider /> : null}</div>
    </div>
  );
};

export default function CardRevenue({ title, api, type="bar" }: CardRevenueProps) {
  return (
    <Card shadow="sm" className="p-6">
      <Tabs defaultValue="monthly">
        <CardHeader className="border-b-1 p-6">
          <div className="space-y-5 sm:space-y-0 sm:flex items-center justify-between w-full">
            <div>
              <p className="font-semibold">{title}</p>
            </div>

            <div>
              <TabsList className="grid w-full grid-cols-3 gap-2 bg-transparent">
                <TabsTrigger  value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <TabsContent value="daily">
            <div className="h-[385px]">
              <ChartRevenue period="daily" api={api} chartType={type} />
            </div>
          </TabsContent>
          <TabsContent value="monthly">
            <div className="h-[385px]">
              <ChartRevenue period="monthly" api={api} chartType={type} />
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="h-[385px]">
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