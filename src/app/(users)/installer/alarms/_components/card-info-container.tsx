"use client";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import CardInfo from "./card-info";
import {
  BatteryFull,
  BellRing,
  CircleDollarSign,
  ClipboardCheck,
  DatabaseZap,
  FolderCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchAlarms({ time }: { time: string }) {
  return axios.get(`/api/tsdb/alarms?time=${time}`);
}

function fetchWorkOrders({ time }: { time: string }) {
  return axios.get(`/api/work_orders?time=${time}`);
}

export default function CardInfoContainer() {
  const [today, setToday] = useState(new Date().toISOString());
  // query alarms based on datePickerValue value
  const { data: alarms } = useQuery({
    queryKey: ["alarms", today],
    queryFn: () => fetchAlarms({ time: today }),
    refetchInterval: 30000,
  });
  // console.log("alarms", alarms?.data?.length);

  const { data: workOrders } = useQuery({
    queryKey: ["work_orders", today],
    queryFn: () => fetchWorkOrders({ time: today }),
    refetchInterval: 30000,
  });
  // console.log("workOrders", workOrders?.data?.length);

  const closedWorkOrders =
    workOrders?.data?.filter((workOrder: any) => workOrder?.closedAt) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-x-5">
      <CardInfo
        title="Today's Alarms"
        subtitle="Problems triggered"
        value={alarms?.data?.length || "0"}
        unitValue="Alarms"
        className="bg-rose-500 text-white"
        logo={<BellRing size={40} />}
      />
      <CardInfo
        title="Work Order Issued Today"
        subtitle="Problems triggered"
        value={workOrders?.data?.length || "0"}
        unitValue="Orders"
        className="bg-violet-600 text-white"
        logo={<ClipboardCheck size={40} />}
      />
      <CardInfo
        title="Work Order Closed Today"
        subtitle="Completed orders"
        value={closedWorkOrders?.length || "0"}
        unitValue="Orders"
        className="bg-blue-500 text-white"
        logo={<FolderCheck size={40} />}
      />
    </div>
  );
}
