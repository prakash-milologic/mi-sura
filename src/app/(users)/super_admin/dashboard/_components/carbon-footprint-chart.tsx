"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CarbonFootrpintChart({
  openValue,
  closedValue,
  openValueLabel,
  closedValueLabel,
  isPlant = false
}: // inprogressValue,
  {
    openValue: number;
    closedValue: number;
    openValueLabel: string;
    closedValueLabel: string;
    isPlant?: boolean;
    // inprogressValue: number;
  }) {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1280); // Adjust breakpoint for "small" devices
      setIsLargeScreen(window.innerWidth >= 1536); // Adjust breakpoint for "small" devices
    };
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    dataLabels: {
      enabled: false,
    },
    labels: [openValueLabel, closedValueLabel],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: isPlant && !isSmallScreen && !isLargeScreen ? "left" : "center",
      onItemClick: {
        toggleDataSeries: false,
      },
      markers: {
        width: 14,
        height: 14,
        radius: 4,
      },
      itemMargin: {
        horizontal: 12
      }
    },
    stroke: {
      width: 3, // Adds space between slices
      colors: [theme === "dark" ? "#262629" : "#ffffff"], // Matches background for better spacing effect
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
