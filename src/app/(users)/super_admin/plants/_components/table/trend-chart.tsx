"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { format } from "date-fns";
import { useTheme } from "next-themes";

export default function TrendChart({ trend }: { trend: any[] | null }) {
  const data = trend?.map((t) => Math.floor(Number(t?.dpy) * 100) / 100) || [];

  const categories =
    trend?.map((t: any) => {
      return format(t?.bucket, "yyyy/MM/dd HH:mm:ss");
    }) || [];

  const series: ApexAxisChartSeries = [
    {
      name: "DP",
      data,
    },
  ];
  const { theme } = useTheme();
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
    stroke: {
      width: 1,
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
      categories,
    },
    noData: {
      // offsetY: -10,
      align: "center",
      text: "N/A",
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
