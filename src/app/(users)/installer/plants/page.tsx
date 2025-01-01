"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { usePlants } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchPlants({ isUser }: { isUser: boolean }) {
  return axios.get(`/api/plants?is_user=${isUser}`);
}

export default function PlantsPage() {
  const { data: plants, isLoading: isLoadingPlants } = useQuery({
    queryKey: ["plants", { isUser: true }],
    queryFn: () => fetchPlants({ isUser: true }),
    gcTime: 0,
  });
  // const { data: plants, isLoading } = usePlants({ isUser: true });

  // console.log(plants?.data);

  const tableData = plants?.data || [];

  if (isLoadingPlants) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <Link
        href={"/installer/plants/create"}
        className={buttonVariants({ variant: "outline" })}
      >
        Create +
      </Link>

      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
