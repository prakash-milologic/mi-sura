"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "@/app/(users)/admin/devices/components/data-table-toolbar";
import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter, // Add global filter state
    },
    initialState: {
      pagination: {
        pageSize: 5, // Set the default number of rows per page
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter, // Handler for global filter change
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Ensure filtering logic is active
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });


  return (
    <div className="">
      <div className="p-6 flex justify-between items-center">
        <p className=" text-sm md:text-xl font-semibold text-[#171717] dark:text-[#FFFFFF]">Performance Insights</p>
        <form className="max-w-md">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-2 md:ps-3 pointer-events-none">
              {/* <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.66683 13.9948C11.1646 13.9948 14.0002 11.1593 14.0002 7.66146C14.0002 4.16366 11.1646 1.32812 7.66683 1.32812C4.16903 1.32812 1.3335 4.16366 1.3335 7.66146C1.3335 11.1593 4.16903 13.9948 7.66683 13.9948Z"
                  stroke="#171717"
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6668 14.6615L13.3335 13.3281"
                  stroke="#171717"
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <Search width={16} height={16} className=" w-3 h-3 md:w-4 md:h-4 darK:fill-[FFFFFF66]" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full px-3 py-2 ps-6 md:px-4 md:py-3 md:ps-8 text-sm text-gray-900 border border-[] dark:border-[#FFFFFF33] placeholder-[#171717A6] rounded-lg bg-transparent focus:outline-none outline-none dark:placeholder-[#FFFFFF66] dark:text-white"
              placeholder="Search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className=" w-[77.6vw] m-auto overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-secondary z-10 dark:bg-[#43434A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-[#686868] dark:text-[#FFFFFFBF] font-medium text-xs">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={` py-2 px-3 md:py-4 md:px-6 h-auto dark:text-[#FFFFFFBF] `}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    
                    <TableCell
                      key={cell.id}
                      className={`h-auto p-3 md:py-6 md:px-6  text-xs md:text-sm text-[#171717] dark:text-white whitespace-nowrap dark:border-b dark:border-[#FFFFFF1A] ${index !== 0 && cell.column.id !=="address"  ? "text-center" : "pl-3 md:pl-6" }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />

    </div>

  );
}
