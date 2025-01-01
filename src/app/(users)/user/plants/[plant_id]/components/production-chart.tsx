"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "../utils";
import { useTheme } from "next-themes";

export default function ProductionChart({ value }: { value: number }) {
  const { theme } = useTheme();
  // const arrayLength = 1; // Change this value to the desired length of the array
  // const minValue = 4; // Minimum value for the random numbers
  // const maxValue = 100; // Maximum value for the random numbers

  // let randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);

  // randomNumbers = randomNumbers.map((number) => Number(number.toFixed(2)));
  let data = Math.floor((value * 100) / 100);

  const series: ApexNonAxisChartSeries = [data];
  const options: ApexOptions = {
    theme: {
      mode: theme as "light" | "dark",
    },
    chart: {
      background: "transparent",
    },
    colors: [colors.blue[500]],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "18px",
            offsetY: 10,
          },
        },
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      width={"100%"}
      height={"100%"}
    />
  );
}
