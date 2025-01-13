"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { ApexOptions } from "apexcharts";
import colors from "tailwindcss/colors";
import { generateRandomArray } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function CarbonFootrpintChart({
  openValue,
  closedValue,
  openValueLabel,
  closedValueLabel,
}: // inprogressValue,
{
  openValue: number;
  closedValue: number;
  openValueLabel: string;
  closedValueLabel: string;
  // inprogressValue: number;
}) {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();



  const series: ApexNonAxisChartSeries = [
    openValue,
    closedValue,
    // inprogressValue,
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
    },
    labels: [openValueLabel, closedValueLabel],
    legend: {
      show: true,
      position: "bottom",
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    colors: [ '#00A38C','#00E397'],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    tooltip: {
        enabled: true,
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const value = series[seriesIndex];
          const label = w.globals.labels[seriesIndex];
          return `
            <div style="
              background: #171717; 
              color: #fff; 
              padding: 8px;
              font-size: 12px;
              text-align: center;
            ">
              <p>${currentYear} ${label}: ${value}</p>
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
