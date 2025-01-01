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
import { Plant, PlantWithUser } from "@/db/schema/plant";
import { cn } from "@/lib/utils";
import DeletePlant from "../delete";
import EditPlant from "../edit";
import { buttonVariants } from "@/components/ui/button";

export const columns: ColumnDef<PlantWithUser>[] = [
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
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "coordinates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coordinates" />
    ),
    cell: ({ row }) => (
      <div>
        <span>Lat: {row.original.coordinates.lat}</span>, lng:
        {row.original.coordinates.lng}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => <div>{row.original.user?.email}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="space-x-6 items-center flex">
        <Link
          className={cn({
            "pointer-events-none opacity-40": !row.original.devices.length,
          })}
          href={`/installer/plants/${row.original.id}`}
        >
          View
        </Link>

        <Link
          href={`/installer/plants/${row.original.id}/edit`}
          className={buttonVariants({ variant: "outline" })}
        >
          Edit Plant
        </Link>
        <DeletePlant id={String(row.original.id)} />
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
