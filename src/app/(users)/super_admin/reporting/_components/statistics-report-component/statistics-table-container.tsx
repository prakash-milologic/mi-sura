"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { DataTable } from "./statistics_report_table/data-table";
import {
  dayStatisticsColumns,
  monthStatisticsColumns,
  totalStatisticsColumns,
  yearStatisticsColumns,
} from "./statistics_report_table/columns";
import { DataTable } from "./statistics_report_table/data-table";

function fetchStatisticsReportPlants({
  period,
  time,
}: {
  period: string;
  time: string;
}) {
  return axios.get(
    `/api/tsdb/statistics_report/plants?period=${period}&time=${time}`
  );
}

export default function StatisticsTableContainer({
  currentTab,
  datePickerValue,
  setStatisticsPlantsData,
}: {
  currentTab: string;
  datePickerValue: string;
  setStatisticsPlantsData: Dispatch<SetStateAction<any[] | undefined>>;
}) {
  const {
    data: statisticsReportPlants,
    isLoading: isLoadingStatisticsReportPlants,
    error: errorStatisticsReportPlants,
    refetch: refetchStatisticsReportPlants,
  } = useQuery({
    queryKey: [
      "statistics_report",
      "plants",
      { period: currentTab },
      { time: datePickerValue },
    ],
    queryFn: () =>
      fetchStatisticsReportPlants({
        period: currentTab,
        time: datePickerValue,
      }),
  });

  const getStatisticsPlantsData = (
    statisticsReportPlants: any[],
    currentTab: string
  ) => {
    const currency = "MYR";
    if (currentTab === "day") {
      const data = statisticsReportPlants?.map((data: any) => {
        const revenue = Number(
          getCurrentRevenue(data?.currentYield).split(" ")[0]
        );
        return {
          id: data?.plantId,
          plant: data?.plantName,
          installedPower: Number(getInstalledCapacity(data?.capacity)),
          yieldToday: Number(getCurrentYield(data?.currentYield)),
          totalYield: Number(getTotalYield(data?.totalYield)) * 1000,
          revenueToday: revenue,
          totalCO2Reduction: Number(getTotalCO2Reduction(data?.totalYield)),
          address: data?.plantAddress,
        };
      });
      return data;
    }
    if (currentTab === "month") {
      const data = statisticsReportPlants?.map((data: any) => {
        const revenue = Number(
          getCurrentRevenue(data?.currentYield).split(" ")[0]
        );
        return {
          id: data?.plantId,
          plant: data?.plantName,
          installedPower: Number(getInstalledCapacity(data?.capacity)),
          yieldThisMonth: Number(getCurrentYield(data?.currentYield)),
          totalYield: Number(getTotalYield(data?.totalYield)) * 1000,
          revenueThisMonth: revenue,
          totalCO2Reduction: Number(getTotalCO2Reduction(data?.totalYield)),
          address: data?.plantAddress,
        };
      });
      return data;
    }
    if (currentTab === "year") {
      const data = statisticsReportPlants?.map((data: any) => {
        const revenue = Number(
          getCurrentRevenue(data?.currentYield).split(" ")[0]
        );
        return {
          id: data?.plantId,
          plant: data?.plantName,
          installedPower: Number(getInstalledCapacity(data?.capacity)),
          yieldThisYear: Number(getCurrentYield(data?.currentYield)),
          totalYield: Number(getTotalYield(data?.totalYield)) * 1000,
          revenueThisYear: revenue,
          totalCO2Reduction: Number(getTotalCO2Reduction(data?.totalYield)),
          address: data?.plantAddress,
        };
      });
      return data;
    }
    if (currentTab === "total") {
      const data = statisticsReportPlants?.map((data: any) => {
        const revenue = Number(getTotalRevenue(data?.totalYield).split(" ")[0]);
        return {
          id: data?.plantId,
          plant: data?.plantName,
          installedPower: Number(getInstalledCapacity(data?.capacity)),
          totalYield: Number(getTotalYield(data?.totalYield)) * 1000,
          cumulativeTotalRevenue: revenue,
          totalCO2Reduction: Number(getTotalCO2Reduction(data?.totalYield)),
          address: data?.plantAddress,
        };
      });
      return data;
    }
    return [];
  };

  useEffect(() => {
    if (statisticsReportPlants?.data && currentTab) {
      setStatisticsPlantsData(
        getStatisticsPlantsData(statisticsReportPlants?.data, currentTab)
      );
    }
  }, [statisticsReportPlants]);

  const getCurrentYield = (currentYield: string) => {
    const value = Number(currentYield);
    if (isNaN(value)) return "--";
    return Math.floor((value / 10) * 1000) / 1000;
  };

  const getTotalYield = (totalYield: string) => {
    const value = Number(totalYield);
    if (isNaN(value)) return "--";
    return Math.floor(value * 0.001 * 1000) / 1000;
  };

  const getInstalledCapacity = (capacity: string) => {
    const value = Number(capacity);
    if (isNaN(value)) return "--";
    return Math.floor(value * 1000) / 1000;
  };

  const getTotalCO2Reduction = (totalYield: string) => {
    const value = Number(totalYield);
    const energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    const result = Math.floor((value / 10) * energyCommission * 1000) / 1000;
    return isNaN(result) ? "--" : String(result);
  };

  const getCurrentRevenue = (currentYield: string) => {
    const value = Number(currentYield);
    const tariff = 0.57; // static value refer to tariff given by mimos
    const result = Math.floor((value / 10) * tariff * 1000) / 1000;
    return isNaN(result) ? "--" : String(result + " MYR");
  };

  const getTotalRevenue = (totalYield: string) => {
    const value = Number(totalYield);
    const tariff = 0.57; // static value refer to tariff given by mimos
    const result = Math.floor((value / 10) * tariff * 1000) / 1000;
    return isNaN(result) ? "--" : String(result + " MYR");
  };

  const getStatistics = () => {
    const data: any[] = getStatisticsPlantsData(
      statisticsReportPlants?.data,
      currentTab
    );

    if (currentTab === "day") {
      return { columns: dayStatisticsColumns, data };
    }
    if (currentTab === "month") {
      return { columns: monthStatisticsColumns, data };
    }
    if (currentTab === "year") {
      return { columns: yearStatisticsColumns, data };
    }
    if (currentTab === "total") {
      return { columns: totalStatisticsColumns, data };
    }
    return { columns: [], data: [] };
  };

  return (
      <DataTable
        columns={getStatistics().columns as any}
        data={getStatistics().data || []}
      />
  );
}
