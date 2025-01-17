"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function CardInfoChart({
  activeValue,
  faultValue,
  inactiveValue,
}: {
  activeValue: number;
  faultValue: number;
  inactiveValue: number;
}) {
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

  function noData() {
    if (!activeValue && !faultValue && !inactiveValue) {
      return "N/A";
    }
  }

  function getSeries() {
    if (activeValue || faultValue || inactiveValue) {
      return [activeValue,  inactiveValue, faultValue];
    }
    return [];
  }

  const series: ApexNonAxisChartSeries = getSeries();

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
      }
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Active", "Inactive", "Faulty"],
    legend: {
      show: true,
      position: "bottom",
      onItemClick: {
        toggleDataSeries: false,
      },
      markers:{
        width: 14,
        height: 14,
        radius: 4,
      },
      itemMargin:{
        horizontal:12
      }
    },
    colors: [ '#3FC43A','#C5C5C5','#FF493F'],
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    tooltip: {
        enabled: true,
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const value = series[seriesIndex];
          const label = w.globals.labels[seriesIndex];
          const total = series.reduce((acc:number, curr:number) => acc + curr, 0);
          const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
          return `
            <div style="
              background: #171717; 
              color: #fff; 
              padding: 8px;
              font-size: 12px;
              text-align: center;
            ">
              <p>${label}:  ${percentage}%</p>
            </div>
          `;
        },
      },

    noData: {
      text: "N/A",
    },
  };


  return (
    <div className="h-full">
      <Chart
        options={options}
        series={series}
        type="donut"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
