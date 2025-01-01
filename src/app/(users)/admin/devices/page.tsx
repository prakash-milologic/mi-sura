"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { devices } from "@/lib/data";
import { columns } from "./components/columns";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function fetchDevicesList() {
  return axios.get(`/api/tsdb/devices_list`);
}

export default function DevicePage() {
  const {
    data: devicesList,
    isLoading: isLoadingDevicesList,
    isError: isErrorDevicesList,
  } = useQuery({
    queryKey: ["devices_list"],
    queryFn: fetchDevicesList,
  });

  if (isLoadingDevicesList) {
    return <div className="px-6">Loading...</div>;
  }

  if (isErrorDevicesList) {
    return <div className="px-6">Something went wrong</div>;
  }

  return (
    <div className="px-6">
      <DataTable columns={columns} data={devicesList?.data || []} />
    </div>
  );
}
