"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IPlant } from "@/lib/types";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  MinusCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import TrendChart from "./trend-chart";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<IPlant>[] = [
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
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isAlert",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alerts" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.original.isAlert == undefined ? (
            <MinusCircledIcon />
          ) : row.original.isAlert ? (
            <ExclamationTriangleIcon color="yellow" />
          ) : (
            <CheckCircledIcon color="green" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => <div>{row.getValue("capacity")}kWp</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "production",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Production" />
    ),
    cell: ({ row }) => <div>{row.getValue("production")}kW</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "power",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Power" />
    ),
    cell: ({ row }) => <div>{row.getValue("power")}%</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dailyProduction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily Production" />
    ),
    cell: ({ row }) => <div>{row.getValue("dailyProduction")}kWh</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "trend",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trend" />
    ),
    cell: ({ row }) => (
      <div className="h-10 w-10">
        <TrendChart trend={row.original.trend} />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "peakHoursToday",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Peak Hours Today" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("peakHoursToday")}h</div>,
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        className={cn({
          "pointer-events-none opacity-40": !row.original.trend,
        })}
        href={`/super_admin/plants/${row.original.id}`}
      >
        View
      </Link>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
