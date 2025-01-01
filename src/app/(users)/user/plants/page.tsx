"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { usePlants } from "@/hooks";

export default function AccountsPage() {
  const { data: plants, isLoading } = usePlants({ isUser: true });

  // console.log(plants?.data);

  const tableData = plants?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      {/* <Link
        href={"/installer/plants/create"}
        className={buttonVariants({ variant: "outline" })}
      >
        Create +
      </Link> */}

      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
