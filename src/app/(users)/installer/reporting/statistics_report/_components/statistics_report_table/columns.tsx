"use client";

import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export type DayStatisticsReport = {
  id: string;
  plant: string;
  installedPower: number;
  yieldToday: number | string;
  totalYield: number | string;
  revenueToday: number | string;
  totalCO2Reduction: number | string;
  address: string;
};

export type MonthStatisticsReport = {
  id: string;
  plant: string;
  installedPower: number;
  yieldThisMonth: number | string;
  totalYield: number | string;
  revenueThisMonth: number | string;
  totalCO2Reduction: number | string;
  address: string;
};

export type YearStatisticsReport = {
  id: string;
  plant: string;
  installedPower: number;
  yieldThisYear: number | string;
  totalYield: number | string;
  revenueThisYear: number | string;
  totalCO2Reduction: number | string;
  address: string;
};

export type TotalStatisticsReport = {
  id: string;
  plant: string;
  installedPower: number;
  totalYield: number | string;
  cumulativeTotalRevenue: number | string;
  totalCO2Reduction: number | string;
  address: string;
};

export const dayStatisticsColumns: ColumnDef<DayStatisticsReport>[] = [
  {
    accessorKey: "plant",
    header: ({ column }) => <div className="min-w-[10rem]">Plant</div>,
  },
  {
    accessorKey: "installedPower",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Installed Power (kWp)
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
    accessorKey: "yieldToday",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Yield Today (kWh)
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
          Total Yield (kWh)
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
    accessorKey: "revenueToday",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Revenue Today
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
      <div>
        {row.original.revenueToday
          ? `${row.original.revenueToday} MYR`
          : row.original.revenueToday}
      </div>
    ),
  },
  {
    accessorKey: "totalCO2Reduction",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          <span className="space-x-1">
            <span>Total</span>
            <span>
              CO<sub>2</sub>
            </span>
            <span>Reduction (kg)</span>
          </span>{" "}
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
    accessorKey: "address",
    header: ({ column }) => <div className="min-w-[10rem]">Plant Address</div>,
  },
];

export const monthStatisticsColumns: ColumnDef<MonthStatisticsReport>[] = [
  {
    accessorKey: "plant",
    header: ({ column }) => <div className="min-w-[10rem]">Plant</div>,
  },
  {
    accessorKey: "installedPower",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Installed Power (kWp)
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
    accessorKey: "yieldThisMonth",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Yield This Month (kWh)
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
          Total Yield (kWh)
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
    accessorKey: "revenueThisMonth",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Revenue This Month
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
      <div>
        {row.original.revenueThisMonth
          ? `${row.original.revenueThisMonth} MYR`
          : row.original.revenueThisMonth}
      </div>
    ),
  },
  {
    accessorKey: "totalCO2Reduction",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          <span className="space-x-1">
            <span>Total</span>
            <span>
              CO<sub>2</sub>
            </span>
            <span>Reduction (kg)</span>
          </span>{" "}
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
    accessorKey: "address",
    header: ({ column }) => <div className="min-w-[10rem]">Plant Address</div>,
  },
];

export const yearStatisticsColumns: ColumnDef<YearStatisticsReport>[] = [
  {
    accessorKey: "plant",
    header: ({ column }) => <div className="min-w-[10rem]">Plant</div>,
  },
  {
    accessorKey: "installedPower",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Installed Power (kWp)
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
    accessorKey: "yieldThisYear",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Yield This Year (kWh)
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
          Total Yield (kWh)
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
    accessorKey: "revenueThisYear",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Revenue This Year
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
      <div>
        {row.original.revenueThisYear
          ? `${row.original.revenueThisYear} MYR`
          : row.original.revenueThisYear}
      </div>
    ),
  },
  {
    accessorKey: "totalCO2Reduction",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          <span className="space-x-1">
            <span>Total</span>
            <span>
              CO<sub>2</sub>
            </span>
            <span>Reduction (kg)</span>
          </span>{" "}
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
    accessorKey: "address",
    header: ({ column }) => <div className="min-w-[10rem]">Plant Address</div>,
  },
];

export const totalStatisticsColumns: ColumnDef<TotalStatisticsReport>[] = [
  {
    accessorKey: "plant",
    header: ({ column }) => <div className="min-w-[10rem]">Plant</div>,
  },
  {
    accessorKey: "installedPower",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Installed Power (kWp)
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
          Total Yield (kWh)
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
    accessorKey: "cumulativeTotalRevenue",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Cumulative Total Revenue
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
      <div>
        {row.original.cumulativeTotalRevenue
          ? `${row.original.cumulativeTotalRevenue} MYR`
          : row.original.cumulativeTotalRevenue}
      </div>
    ),
  },
  {
    accessorKey: "totalCO2Reduction",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          <span className="space-x-1">
            <span>Total</span>
            <span>
              CO<sub>2</sub>
            </span>
            <span>Reduction (kg)</span>
          </span>{" "}
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
    accessorKey: "address",
    header: ({ column }) => <div className="min-w-[10rem]">Plant Address</div>,
  },
];
