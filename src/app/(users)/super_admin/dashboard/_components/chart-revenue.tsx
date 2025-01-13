"use client";
import React from "react";
import dynamic from "next/dynamic";

// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addHours, format as formatDateFns } from "date-fns";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


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
  api ="",
  chartType
}: {
  period: "live" | "daily" | "monthly" | "yearly";
  chartType: "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
  api?: string;
}) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';


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
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `
          <div style="padding: 10px; background: #171717; color: #fff; ">
            <p style="font-size:12px;">${w.globals.seriesNames[seriesIndex]}: ${value} ${chartType == "area" ? "kWh" : "MYR"} </p>
          </div>
        `;
      },
    },
    // tooltip: {
    //   x: {
    //     format,
    //   },
    // },
    yaxis: {
      decimalsInFloat: 2,
      labels: {
        formatter: function (value) {
          return `${value} ${chartType == "area" ? "kWh" : "MYR"}`;
        },
        style: {
          colors: isDarkTheme ? '#FFFFFFCC' : '#141414',
        },
      }
    },
    xaxis: {
      type: period === "daily" ? "datetime" : "category",
      labels: {
        datetimeUTC: false,
        style: {
          colors: isDarkTheme ? '#FFFFFFCC' : '#141414',
        },
      },
      categories: period === "daily" ? categories : categories?.reverse(),
      axisBorder: {
        color: isDarkTheme ? '#FFFFFFCC' : '#141414',
      },
      axisTicks: {
        color: isDarkTheme ? '#FFFFFFCC' : '#141414',
      },
    },
    fill: {
      type: "gradient",
      gradient: chartType === "bar"
        ? {
            shade: "light",
            type: "vertical",
            gradientToColors: ["#058DF700"], // Ending color for bar
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: "#058DF7", // Start color for bar
                opacity: 1,
              },
              {
                offset: 100,
                color: "#058DF700", // Transparent for bar
                opacity: 0,
              },
            ],
          }
        : chartType === "area"
        ? {
            shade: "light",
            type: "vertical",
            gradientToColors: ["#FD686A00"], // Ending color for area
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: "#FD686A33", // Start color for area
                opacity: 1,
              },
              {
                offset: 100,
                color: "#FD686A00", // Transparent for area
                opacity: 0,
              },
            ],
          }
        : undefined,
    },
    stroke: chartType === "area" ?{
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: ['#FD686A'],
      width: 2,
      dashArray: 0, 
  }:{
    show:false,
    colors:undefined
  },
  markers: {
    size:  0, // Set size of marker
    colors: ["#FD686A"], // Color of the dot
    strokeColors: "#fff", // Add white border
    strokeWidth: 2, // Width of the border
    hover: {
      size: 8, // Dot size on hover
      sizeOffset: 8, // Add padding around the dot on hover
    },
  },
  grid: {
    show: true,
    borderColor: isDarkTheme ? '#FFFFFF1A' : '#1717171A',
    strokeDashArray: 4, // Dashed grid lines
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
        type={chartType}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}