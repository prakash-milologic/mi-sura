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
import { ArrowDown, ArrowDownNarrowWideIcon, ChevronDown, EyeIcon } from "lucide-react";
import { DownArrow } from "@/app/assets/SVGCollection";

export const columns: ColumnDef<IPlant>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PLANT" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isAlert",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ALERTS" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 justify-center">
          {row.original.isAlert == undefined ? (
            <MinusCircledIcon />
          ) : row.original.isAlert ? (
            <ExclamationTriangleIcon color="yellow" />
          ) : (
            <CheckCircledIcon color="#3FC43A" />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity (KWP)" />
    ),
    cell: ({ row }) => <div>{row.getValue("capacity")}kWp</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "production",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PRODUCTION" />
    ),
    cell: ({ row }) => <div>{row.getValue("production")}kW</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "power",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="POWER" />
    ),
    cell: ({ row }) => <div>{row.getValue("power")}%</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dailyProduction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DAILY PRODUCTION" />
    ),
    cell: ({ row }) => <div>{row.getValue("dailyProduction")}kWh</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trend",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TREND" />
    ),
    cell: ({ row }) => (
      <div>
        N/A
      </div>
      // <div className="h-5 w-10 ">
      //   <TrendChart trend={row.original.trend} />
      // </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <div className="px-[20px] py-[10px] dark:border-[#FFFFFF33] dark:text-white border rounded-lg hover:bg-gray-200 dark:hover:bg-[#FFFFFF33]">
          <Link
            className={cn({
              "pointer-events-none opacity-40": !row.original.trend,
            })}
            href={`/super_admin/plants/${row.original.id}`}
          >
            View
          </Link>
        </div>
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
