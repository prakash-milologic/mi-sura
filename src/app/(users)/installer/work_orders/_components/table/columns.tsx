"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IAlert, IPlant, IWorkOrders } from "@/lib/types";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import TrendChart from "./trend-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import CloseWorkOrder from "./close-work-order";

export const columns: ColumnDef<IWorkOrders>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Work Order" />
    ),
    cell: ({ row }) => <div>WO#{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "alarm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alarm Type" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("alarm")}</div>;
    },
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
    accessorKey: "opened",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opened" />
    ),
    cell: ({ row }) => (
      <div>
        <div>On: {row.original.opened.on}</div>
        {/* <div>By: {row.original.opened.by}</div> */}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "assigned",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Assigned" />
  //   ),
  //   cell: ({ row }) => (
  //     <div>
  //       <div>On: {row.original.assigned.on}</div>
  //       <div>To: {row.original.assigned.to}</div>
  //     </div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "closed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Closed" />
    ),
    cell: ({ row }) => <div>{row.original.closed.on}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CloseWorkOrder
        id={row.original.id}
        disabled={!!row.original.closed.on}
      />

      // <Button variant="outline" disabled={!row.original.closed}>
      //   Close
      //   {/* <Download className="h-4 w-4" /> */}
      // </Button>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
