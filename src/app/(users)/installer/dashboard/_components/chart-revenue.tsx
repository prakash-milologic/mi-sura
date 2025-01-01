"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addHours, format as formatDateFns } from "date-fns";

function fetchBucketedPowerYield({
  period,
}: {
  period: "daily" | "monthly" | "yearly";
}) {
  return axios.get(`/api/tsdb/bucketed_power_yield?period=${period}`);
}

function fetchRevenueStatistics({
  period,
}: {
  period: "live" | "daily" | "monthly" | "yearly";
}) {
  return axios.get(`/api/tsdb/revenue_statistics?period=${period}`);
}

export default function ChartRevenue({
  period,
}: {
  period: "live" | "daily" | "monthly" | "yearly";
}) {
  const { theme } = useTheme();

  const { data: bucketedPowerYield, isLoading: isLoadingBucketedPowerYield } =
    useQuery({
      queryKey: ["revenue_statistics", period],
      queryFn: () => fetchRevenueStatistics({ period }),
      refetchInterval: 30000,
    });

  const data = bucketedPowerYield?.data.map((d: any) => {
    let key = "dpy";
    switch (period) {
      case "monthly":
        key = "mpy";
        break;
      case "yearly":
        key = "tpy";
        break;
      default:
        break;
    }
    let powerYield = d[key];
    let tariff = 0.57; // static value refer to tariff given by mimos
    return Math.floor(powerYield * tariff * 1000) / 1000;
  });

  let format = getFormat();
  function getFormat() {
    let format = "dd/MM/yy";
    switch (period) {
      case "monthly":
        format = "MMM'yy";
        break;
      case "yearly":
        format = "MM/yy";
        break;
      default:
        break;
    }
    return format;
  }

  const categories = bucketedPowerYield?.data.map((d: any) => {
    if (period === "daily") {
      return formatDateFns(d.bucket, "yyyy/MM/dd HH:mm:ss");
    }
    if (period === "monthly") {
      return formatDateFns(d.bucket, "MMM`yy");
    }
    if (period === "yearly") {
      return formatDateFns(d.bucket, "yyyy");
    }
  });

  // const arrayLength = 12; // Change this value to the desired length of the array
  // // const minValue = 0; // Minimum value for the random numbers
  // // const maxValue = 100; // Maximum value for the random numbers

  // const startingNumber = 1;

  // // const randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);
  // const consecutiveNumbersArray = Array.from(
  //   { length: arrayLength },
  //   (_, index) => startingNumber + index
  // );

  const series: ApexAxisChartSeries = [
    {
      name: "Revenue",
      data: period === "daily" ? data : data?.reverse(),
    },
  ];
  const options: ApexOptions = {
    theme: {
      mode: theme as "light" | "dark",
    },
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {},
    tooltip: {
      x: {
        format,
      },
    },
    yaxis: {
      decimalsInFloat: 2,
    },
    xaxis: {
      type: period === "daily" ? "datetime" : "category",
      labels: {
        datetimeUTC: false,
      },
      categories: period === "daily" ? categories : categories?.reverse(),
    },
    noData: {
      text: "N/A",
    },
  };

  if (isLoadingBucketedPowerYield) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:p-5 h-full">
      <Chart
        options={options}
        series={series}
        type="area"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
