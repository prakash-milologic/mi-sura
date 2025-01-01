"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Chart component with no SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";

export default function CarbonFootrpintChart({
  openValue,
  closedValue,
  openValueLabel,
  closedValueLabel,
}: {
  openValue: number;
  closedValue: number;
  openValueLabel: string;
  closedValueLabel: string;
}) {
  const { theme } = useTheme();
  const currentTheme = theme || "light";

  const series: ApexNonAxisChartSeries = [
    openValue || 0,
    closedValue || 0,
  ];

  const options: ApexOptions = {
    theme: {
      mode: currentTheme as "light" | "dark",
    },
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    labels: [openValueLabel || "Open", closedValueLabel || "Closed"],
    legend: {
      show: true,
      position: "bottom",
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    colors: ['#00A38C', '#00E397'],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, w }) => {
        const value = series[seriesIndex] ?? "N/A";
        const label = w.globals.labels[seriesIndex] ?? "Unknown";
        return `
          <div style="
            background: #171717; 
            color: #fff; 
            padding: 8px;
            font-size: 12px;
            text-align: center;
          ">
            <p>${label}: ${value}</p>
          </div>
        `;
      },
    },
    noData: {
      text: "N/A",
    },
  };

  return (
    <div className="h-full w-full">
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height="100%"
      />
    </div>
  );
}
