"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
  CardProps,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ChevronUp,
  DatabaseZap,
  LucideIcon,
  Minus,
} from "lucide-react";
import CardInfoChart from "./card-info-chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchBucketedPowerYield({
  period,
}: {
  period: "daily" | "monthly" | "yearly";
}) {
  return axios.get(`/api/tsdb/bucketed_power_yield?period=${period}`);
}

export default function CardInfo({
  type,
  period,
  title,
  value,
  unitValue,
  status,
  diffValue,
  unitDiffValue,
  logo,
  textBackgroundEnabled = false,
  className,
  ...props
}: {
  type: "power" | "revenue";
  period: "daily" | "monthly" | "yearly";
  title: string;
  value: string;
  unitValue: string;
  status: "up" | "down" | "neutral";
  diffValue: string;
  unitDiffValue: string;
  logo: React.ReactNode;
  textBackgroundEnabled?: boolean;
} & CardProps) {
  const { data: bucketedPowerYield, isLoading: isLoadingBucketedPowerYield } =
    useQuery({
      queryKey: ["bucketed_power_yield", period],
      queryFn: () => fetchBucketedPowerYield({ period }),
      refetchInterval: 30000,
    });

  function getData() {
    let data = bucketedPowerYield?.data.map((d: any) => {
      let field = "dpy";
      switch (period) {
        case "monthly":
          field = "mpy";
          break;
        case "yearly":
          field = "tpy";
          break;
        default:
          break;
      }
      let powerYield = d[field];
      if (type === "power") return { ...d, value: powerYield };
      if (type === "revenue") {
        let tariff = 0.57; // static value refer to tariff given by mimos
        return { ...d, value: Math.floor(powerYield * tariff * 1000) / 1000 };
      }
    });
    return data;
  }

  if (isLoadingBucketedPowerYield) {
    return <div>Loading...</div>;
  }

  return (
    <Card shadow="sm" className={cn("p-5", className)} {...props}>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1">
              <span
                className={cn("text-3xl font-bold", {
                  "text-background": textBackgroundEnabled,
                })}
              >
                {value}
              </span>
              <span className="self-start text-sm font-medium text-foreground-400">
                {unitValue}
              </span>
              {/* size="sm" className="h-5 bg-primary-100" radius="sm" */}
              <Chip
                startContent={
                  status === "neutral" ? (
                    <Minus size={12} className="text-neutral-500" />
                  ) : status === "up" ? (
                    <ArrowUp size={12} className="text-success-500" />
                  ) : (
                    <ArrowDown size={12} className="text-danger-500" />
                  )
                }
                color={
                  status === "neutral"
                    ? "default"
                    : status === "up"
                    ? "success"
                    : "danger"
                }
                size="sm"
                className="h-5 bg-success-50"
                radius="sm"
              >
                <span
                  className={cn("text-sm font-medium", {
                    "text-success-500": status === "up",
                    "text-danger-500": status === "down",
                  })}
                >
                  {diffValue}
                  {unitDiffValue}
                </span>
              </Chip>
            </div>
            <span className="text-sm font-medium text-foreground-400">
              {title}
            </span>
          </div>
          <div>
            {logo}
            {/* <DatabaseZap size={40} className="text-foreground-400" /> */}
          </div>
        </div>
        {/* <p className="text-sm font-medium text-foreground-400">{title}</p> */}
      </CardHeader>

      <CardBody>
        <div className="h-32">
          <CardInfoChart data={getData()} period={period} type={type} />
        </div>
      </CardBody>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
