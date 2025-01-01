import React from "react";
import { DataTable } from "./components/data-table";
import { alerts } from "@/lib/data";
import { columns } from "./components/columns";

export default function AlertPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">Alerts</h1>

      <DataTable columns={columns} data={alerts} />
    </div>
  );
}
