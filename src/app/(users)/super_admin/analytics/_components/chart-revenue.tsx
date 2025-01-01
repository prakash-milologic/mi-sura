"use client";
import React from "react";
import Chart from "react-apexcharts";
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

export default function ChartRevenue({
  period,
}: {
  period: "daily" | "monthly" | "yearly";
}) {
  const { theme } = useTheme();

  const { data: bucketedPowerYield, isLoading: isLoadingBucketedPowerYield } =
    useQuery({
      queryKey: ["bucketed_power_yield", period],
      queryFn: () => fetchBucketedPowerYield({ period }),
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
    let powerYield = d[key] / 10;
    let tariff = 0.57; // static value refer to tariff given by mimos
    return Math.floor(powerYield * tariff * 1000) / 1000;
  });

  let format = getFormat();
  function getFormat() {
    let format = "dd/MM/yy HH:mm";
    switch (period) {
      case "monthly":
        format = "dd/MM/yy";
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
    return formatDateFns(d.bucket, "yyyy/MM/dd HH:mm:ss");
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
      data,
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
      // offsetY: -20,
      // style: {
      //   colors: [theme === "light" ? colors.black : colors.white],
      // },
    },
    plotOptions: {
      // bar: {
      //   borderRadius: 5,
      //   columnWidth: "20%",
      //   dataLabels: {
      //     position: "top", // top, center, bottom
      //   },
      // },
    },
    tooltip: {
      x: {
        format,
      },
    },
    // stroke: {
    //   curve: "smooth",
    // },
    // grid: {
    //   show: true,
    // },
    yaxis: {
      // min: 0,
      // max: 100,
      decimalsInFloat: 2,
      //   title: {
      //     text: "kW",
      //   },
      // forceNiceScale: true,
    },
    xaxis: {
      type: "datetime",
      // tooltip: {
      //   formatter: (val: any) => val,
      // },
      labels: {
        datetimeUTC: false,
      },
      categories,
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
