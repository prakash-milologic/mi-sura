"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";

export default function TrendChart() {
  const arrayLength = 7; // Change this value to the desired length of the array
  const minValue = 0; // Minimum value for the random numbers
  const maxValue = 10; // Maximum value for the random numbers

  let randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);
  randomNumbers = randomNumbers.map((number) => Number(number.toFixed(0)));

  const series: ApexAxisChartSeries = [
    {
      name: "Trend",
      data: randomNumbers,
    },
  ];
  const options: ApexOptions = {
    theme: {
      mode: "dark",
    },
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      curve: "smooth",
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
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
