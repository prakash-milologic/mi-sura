"use client";
import React from "react";
import WorkOrderCard from "./work-order-card";
import CurrentWOChart from "./current-wo-chart";
import SummaryWOChart from "./summary-wo-chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function triggerWorkOrders() {
  return axios.get(
    `/api/tsdb/work_orders_trigger?time=${new Date().toISOString()}`
  );
}

export default function WorkOrderContainer() {
  const { data: workOrdersTrigger } = useQuery({
    queryKey: ["work_orders_trigger"],
    queryFn: triggerWorkOrders,
    refetchInterval: 30000,
  });

  const openValue =
    Math.floor(
      (workOrdersTrigger?.data?.filter((data: any) => !data?.closedAt)?.length /
        workOrdersTrigger?.data?.length) *
        100 *
        100
    ) / 100 || 0;
  const closedValue =
    Math.floor(
      (workOrdersTrigger?.data?.filter((data: any) => data?.closedAt)?.length /
        workOrdersTrigger?.data?.length) *
        100 *
        100
    ) / 100 || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="col-span-1">
        <WorkOrderCard title="Current Work Orders" subtitle="">
          <CurrentWOChart
            openValue={openValue}
            closedValue={closedValue}
            // inprogressValue={10}
          />
        </WorkOrderCard>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <WorkOrderCard title="Month-End Summary" subtitle="">
          <SummaryWOChart />
        </WorkOrderCard>
      </div>
    </div>
  );
}
