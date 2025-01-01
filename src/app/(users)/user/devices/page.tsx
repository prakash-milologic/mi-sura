"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { useDevices } from "@/hooks/useDevices";

export default function DevicesPage() {
  const { data: devices, isLoading } = useDevices({ isPlant: true });

  // console.log(devices?.data);

  const tableData = devices?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      {/* <Link
        href={"/installer/devices/create"}
        className={buttonVariants({ variant: "outline" })}
      >
        Create +
      </Link> */}

      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
