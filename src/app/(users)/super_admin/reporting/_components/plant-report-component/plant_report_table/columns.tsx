"use client";

import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DayPlantReport = {
  id: string;
  name: string;
  time: Date;
  dailyYield: number;
  totalYield: number;
};

export type MonthPlantReport = {
  id: string;
  name: string;
  time: Date;
  dailyYield: number;
  totalYield: number;
};

export type YearPlantReport = {
  id: string;
  name: string;
  time: Date;
  monthlyYield: number;
  totalYield: number;
};

export type TotalPlantReport = {
  id: string;
  name: string;
  time: Date;
  annualYield: number;
  totalYield: number;
};

export const dayColumns: ColumnDef<DayPlantReport>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Time
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div suppressHydrationWarning>{row.original.time.toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "dailyYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Daily Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "totalYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Total Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
];

export const monthColumns: ColumnDef<MonthPlantReport>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Time
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div suppressHydrationWarning>
        {row.original.time.toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "dailyYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Daily Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "totalYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Total Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
];

export const yearColumns: ColumnDef<YearPlantReport>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Time
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div suppressHydrationWarning>
        {format(row.original.time, "MMM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "monthlyYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Monthly Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "totalYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Total Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
];

export const totalColumns: ColumnDef<TotalPlantReport>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Time
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div suppressHydrationWarning>
        {new Date(row.original.time).getFullYear()}
      </div>
    ),
  },
  {
    accessorKey: "annualYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Annual Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "totalYield",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Total Yield(kWh)
          {column.getIsSorted() === "desc" ? (
            <CaretDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <CaretUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
];
