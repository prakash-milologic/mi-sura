"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function SummaryWOChart() {
  const { theme } = useTheme();

  const arrayLength = 12; // Change this value to the desired length of the array
  const minValue = 90; // Minimum value for the random numbers
  const maxValue = 120; // Maximum value for the random numbers

  const minValue2 = 30; // Minimum value for the random numbers
  const maxValue2 = 80; // Maximum value for the random numbers

  const startingNumber = 1;

  const randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);
  const randomNumbers2 = generateRandomArray(arrayLength, minValue2, maxValue2);

  const consecutiveNumbersArray = Array.from(
    { length: arrayLength },
    (_, index) => startingNumber + index
  );

  const series: ApexAxisChartSeries = [
    // {
    //   name: "Open",
    //   data: [10, 2, 7, 15],
    // },
    // {
    //   name: "In progress",
    //   data: [10, 15, 11, 6],
    // },
    // {
    //   name: "Closed",
    //   data: [10, 3, 12, 1],
    // },
  ];
  const options: ApexOptions = {
    theme: {
      mode: theme as "light" | "dark",
    },
    chart: {
      stacked: true,
      background: "transparent",
      toolbar: {
        show: false,
      },
      // sparkline: {
      //   enabled: true,
      // },
    },
    legend: {
      show: true,
    },
    colors: [colors.green[400], colors.blue[400], colors.gray[400]],
    // dataLabels: {
    //   enabled: false,
    //   // offsetY: -20,

    //   // style: {
    //   //   colors: [theme === "light" ? colors.black : colors.white],
    //   // },
    // },
    plotOptions: {
      // bar: {
      //   borderRadius: 5,
      //   columnWidth: "50%",
      //   // dataLabels: {
      //   //   position: "top", // top, center, bottom
      //   // },
      // },
    },
    stroke: {
      //   curve: "smooth",
    },
    // grid: {
    //   show: false,
    // },
    // yaxis: {
    //   min: 30,
    //   max: 100,
    //   //   decimalsInFloat: 0,
    //   //   title: {
    //   //     text: "kW",
    //   //   },
    //   forceNiceScale: true,
    // },
    xaxis: {
      type: "datetime",
      categories: [
        "01/05/2023 GMT",
        "01/06/2023 GMT",
        "01/07/2023 GMT",
        "01/08/2023 GMT",
      ],
    },
    noData: {
      offsetY: -15,
      text: "N/A",
    },
  };

  return (
    <div className="h-full">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
