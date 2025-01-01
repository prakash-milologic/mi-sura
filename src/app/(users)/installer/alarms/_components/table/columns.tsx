"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IAlert, IPlant } from "@/lib/types";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import TrendChart from "./trend-chart";

export const columns: ColumnDef<IAlert>[] = [
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "plant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plant" />
    ),
    cell: ({ row }) => <div>{row.getValue("plant")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "device",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Device" />
    ),
    cell: ({ row }) => <div>{row.getValue("device")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "openedTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opened Time" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.openedTime &&
          new Date(row.original.openedTime).toLocaleString()}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <Link href={`/super_admin/monitor/${row.original.id}`}>View</Link>
  //   ),
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
