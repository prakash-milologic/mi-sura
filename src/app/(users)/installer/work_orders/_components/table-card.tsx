"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import CurrentWOChart from "./current-wo-chart";
import { DataTable } from "./table/data-table";
import { alerts, workOrders } from "@/lib/data";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function triggerWorkOrders() {
  return axios.get(
    `/api/tsdb/work_orders_trigger?time=${new Date().toISOString()}`
  );
}

export default function TableCard() {
  const { data: workOrdersTrigger } = useQuery({
    queryKey: ["work_orders_trigger"],
    queryFn: triggerWorkOrders,
    refetchInterval: 30000,
  });

  const workOrdersData =
    workOrdersTrigger?.data?.map((data: any) => ({
      id: String(data?.id),
      plant: data?.device?.plant?.name,
      alarm: data?.alarmType,
      device: data?.device?.name,
      opened: {
        on: new Date(data?.openedAt).toLocaleString(),
        by: "",
      },
      assigned: {
        on: "",
        by: "",
      },
      closed: {
        on: data?.closedAt ? new Date(data?.closedAt).toLocaleString() : "",
      },
    })) || [];

  return (
    <Card shadow="sm" className="p-5">
      <CardBody>
        <DataTable data={workOrdersData} columns={columns} />
      </CardBody>
    </Card>
  );
}
