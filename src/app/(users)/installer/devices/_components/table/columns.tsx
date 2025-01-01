"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IPlant } from "@/lib/types";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import TrendChart from "./trend-chart";
import { DeviceWithPlant } from "@/db/schema/device";
import EditDevice from "../edit";
import DeleteDevice from "../delete";

export const columns: ColumnDef<DeviceWithPlant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name/SN" />
    ),
    cell: ({ row }) => (
      <div>
        <div> {row.original.name}</div>
        <div className="text-gray-500"> {row.original.serialNumber}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "plantId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Connected Plant" />
    ),
    cell: ({ row }) => <div>{row.original.plant?.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="space-x-6">
        <Link href={`/installer/devices/${row.original.name}`}>View</Link>
        <EditDevice serialNumber={row.original.serialNumber} />
        <DeleteDevice id={String(row.original.id)} />
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //   ),
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
