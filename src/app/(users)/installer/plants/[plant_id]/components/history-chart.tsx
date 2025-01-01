"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "../utils";
import { useTheme } from "next-themes";
import { addHours, format } from "date-fns";

export default function HistoryChart({ data }: { data: any[] }) {
  const { theme } = useTheme();
  // const arrayLength = 7; // Change this value to the desired length of the array
  // const minValue = 0; // Minimum value for the random numbers
  // const maxValue = 1.5; // Maximum value for the random numbers

  // const randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);
  // const randomNumbers2 = generateRandomArray(arrayLength, minValue, maxValue);
  const dailyYieldPowerValues = data.map(
    (d) => Math.floor(Number(d.dpy) * 1000) / 1000
  );

  // console.log(dailyYieldPowerValues);

  const dailyYieldPowerTime = data.map((d) =>
    format(d.bucket, "yyyy/MM/dd HH:mm:ss")
  );

  const series: ApexAxisChartSeries = [
    {
      name: "Daily Yield Power",
      data: dailyYieldPowerValues,
    },
  ];
  const options: ApexOptions = {
    theme: {
      mode: (theme as "light") || "dark",
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
    stroke: {
      curve: "smooth",
    },
    grid: {
      show: false,
    },
    yaxis: {
      // min: 0,
      // max: 1.5,
      decimalsInFloat: 2,
      // title: {
      //   text: "kW",
      // },
      // forceNiceScale: true,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    xaxis: {
      type: "datetime",
      categories: dailyYieldPowerTime,
      labels: {
        datetimeUTC: false,
      },
    },
    noData: {
      offsetY: -15,
      text: "No daily production",
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width={"100%"}
      height={"100%"}
    />
  );
}
