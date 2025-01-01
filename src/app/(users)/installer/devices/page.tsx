"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { useDevices } from "@/hooks/useDevices";
import AddDeviceSetupSimulation from "./_components/add-device-setup-simulation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreateDevice from "./_components/create";

function fetchDevices() {
  return axios.get(`/api/devices`);
}

export default function DevicesPage() {
  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  // const { data: devices, isLoading } = useDevices({ isPlant: true });

  // console.log(devices?.data);

  const tableData = devices?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <CreateDevice />
        {/* <Link
          href={"/installer/devices/create"}
          className={buttonVariants({ variant: "outline" })}
        >
          Create +
        </Link> */}

        {/* <AddDeviceSetupSimulation /> */}
      </div>

      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
