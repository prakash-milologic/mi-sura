"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IAlert, IDevice, IPlant } from "@/lib/types";
import { CheckCircledIcon, MinusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import InstallerCell from "./installer-cell";
import EditDevice from "./edit-device";

export const columns: ColumnDef<IDevice>[] = [
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
        <div className="capitalize"> {row.original.name}</div>
        <div className="text-gray-500"> {row.original.id}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="pl-2">
          {row.original.status === "active" ? (
            <CheckCircledIcon color="green" />
          ) : (
            <MinusCircledIcon />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "connectedPlant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Connected Plant" />
    ),
    cell: ({ row }) => <div>{row.getValue("connectedPlant")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "dcDiscrete",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="DC Discrete" />
  //   ),
  //   cell: ({ row }) => <div>--</div>,
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "production",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Production" />
    ),
    cell: ({ row }) => <div>{row.getValue("production")} kW</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dailyProduction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily Production" />
    ),
    cell: ({ row }) => <div>{row.getValue("dailyProduction")} kWh</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "installer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Installer" />
    ),
    cell: ({ row }) => <InstallerCell id={row.original.installer} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "peakHoursToday",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Peak Hours Today" />
  //   ),
  //   cell: ({ row }) => <div>--</div>,
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="space-x-6">
        <Link href={`/super_admin/devices/${row.original.name}`}>View</Link>
        <EditDevice serialNumber={row.original.id} />
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
