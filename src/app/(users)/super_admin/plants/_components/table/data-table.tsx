"use client";

import * as React from "react";
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

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
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
  const [selectedRows, setSelectedRows] = React.useState("");
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <div className="p-6 flex justify-between items-center flex-wrap gap-2">
          <p className="text-base md:text-xl  font-semibold text-[#171717] dark:text-white">
            Plants Summary
          </p>       
           <form className="max-w-md">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 md:ps-3 pointer-events-none">
                <Search width={16} height={16} className=" w-3 h-3 md:w-4 md:h-4 darK:fill-[FFFFFF66]" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full px-3 py-1 ps-10 md:px-4 md:py-3 md:ps-8 text-sm text-gray-900 border border-[] dark:border-[#FFFFFF33] placeholder-[#171717A6] rounded-lg bg-transparent focus:outline-none outline-none dark:placeholder-[#FFFFFF66] dark:text-white"
                placeholder="Search"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </form>
        </div>
      <div className="w-[77.6vw] lg:w-full m-auto overflow-x-auto">
      
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-secondary z-10 dark:bg-[#43434A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead className={`py-2 pl-3 md:py-4 md:pl-2 h-auto uppercase dark:text-[#FFFFFFBF] font-medium text-xs ${index !== 0 && "text-center"}`} key={header.id} colSpan={header.colSpan}>
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
                  className="dark:bg-[#262629] dark:hover:bg-[#333333] cursor-pointer"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id}
                      className={`h-auto md:py-6  text-xs md:text-sm md:text-sm text-[#171717] dark:text-white whitespace-nowrap dark:border-b dark:border-[#FFFFFF1A] ${index !== 0 ? "text-center" : ""}`}
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
