"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";
import { useTheme } from "next-themes";
import { addHours, format } from "date-fns";

export default function CardInfoChart({
  data,
  period,
  type,
}: {
  data: any[];
  period: "daily" | "monthly" | "yearly";
  type: "power" | "revenue";
}) {
  const { theme } = useTheme();

  // const arrayLength = 12; // Change this value to the desired length of the array
  // const minValue = 0; // Minimum value for the random numbers
  // const maxValue = 100; // Maximum value for the random numbers

  // const startingNumber = 1;

  // const randomNumbers = generateRandomArray(arrayLength, minValue, maxValue);
  // const consecutiveNumbersArray = Array.from(
  //   { length: arrayLength },
  //   (_, index) => startingNumber + index
  // );

  const chartData = data.slice(0, 15).map((d) => Number(d.value));
  const chartCategories = data
    .slice(0, 15)
    .map((d) => format(d.bucket, "yyyy/MM/dd HH:mm:ss"));

  function getFormat() {
    if (period === "daily") return "dd/MM/yy HH:mm";
    if (period === "monthly") return "dd/MM/yy";
    if (period === "yearly") return "MM/yy";
  }

  // console.log(chartCategories);

  const series: ApexAxisChartSeries = [
    {
      name: type === "power" ? "Power Yield" : "Revenue",
      data: chartData,
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
      sparkline: {
        enabled: true,
      },
    },
    // dataLabels: {
    //   offsetY: -20,

    //   style: {
    //     colors: [theme === "light" ? colors.black : colors.white],
    //   },
    // },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "50%",
        // dataLabels: {
        //   position: "top", // top, center, bottom
        // },
      },
    },
    // stroke: {
    //   curve: "smooth",
    // },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        format: getFormat(),
      },
      followCursor: true,
    },
    yaxis: {
      // min: 0,
      // max: 100,
      decimalsInFloat: 2,
      labels: {
        show: false,
      },
      //   title: {
      //     text: "kW",
      //   },
      // forceNiceScale: true,
    },
    xaxis: {
      type: "datetime",
      // type: "numeric",
      categories: chartCategories,
      labels: {
        datetimeUTC: false,
      },
      // min: 7,
      // tickAmount: 7,
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
