"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "../utils";
import { useTheme } from "next-themes";
import { addHours, format } from "date-fns";

export default function PlannedProductionChart({ data }: { data: any[] }) {
  const { theme } = useTheme();
  // const arrayLength = 7; // Change this value to the desired length of the array
  // const minValue = 0; // Minimum value for the random numbers
  // const maxValue = 45; // Maximum value for the random numbers

  // const randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);
  // const randomNumbers2 = generateRandomArray(arrayLength, minValue, maxValue);
  // const randomNumbers3 = generateRandomArray(arrayLength, minValue, maxValue);
  const monthlyYieldPowerValues = data.map(
    (d) => Math.floor(Number(d.mpy) * 1000) / 1000
  );
  const monthlyYieldPowerTime = data.map((d) => format(d.bucket, "yyyy/MM/dd"));

  const series: ApexAxisChartSeries = [
    {
      name: "Monthly Production",
      data: monthlyYieldPowerValues,
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
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      // min: 0,
      // max: 45,
      // decimalsInFloat: 0,
      title: {
        text: "kWh",
      },
      // forceNiceScale: true,
    },
    // colors: [colors.blue[400], colors.yellow[300], colors.green[300]],
    xaxis: {
      type: "datetime",
      categories: monthlyYieldPowerTime,
      labels: {
        datetimeUTC: false,
        format: "dd",
      },
      title: {
        text: `${format(new Date(), "MMM yyyy")}`,
      },
    },
    noData: {
      offsetY: -15,
      text: "No monthly planned production",
    },
    colors: [colors.green[500]],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width={"100%"}
      height={"100%"}
    />
  );
}
