"use client";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const visiblePages = 5; // Number of page numbers to display
  const startPage = Math.max(1, pageIndex - Math.floor(visiblePages / 2));
  const endPage = Math.min(pageCount, startPage + visiblePages - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <p className="text-xs md:text-sm font-normal text-[#686868]">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-6 w-[60px] md:h-10 md:w-[72px] bg-[#F4F5F7] focus:outline-none outline-none focus:ring-0 dark:bg-[#43434A] dark:text-white">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button> */}
          <Button
            variant="outline"
            className="h-6 w-6 md:h-8 md:w-8 p-0 dark:bg-transparent dark:border-[#FFFFFF1A]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              variant={pageIndex + 1 === page ? "default" : "outline"}
              className={`h-6 w-6 md:h-8 md:w-8 p-0 ${
                pageIndex + 1 === page ? "bg-green-500 text-white" : " bg-white border border-gray-300 text-[#171717] dark:bg-transparent dark:border-[#FFFFFF1A] dark:text-[#FFFFFFBF]"
              }`}
              onClick={() => table.setPageIndex(page - 1)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-6 w-6 md:h-8 md:w-8 p-0 dark:bg-transparent dark:border-[#FFFFFF1A] dark:text-[#FFFFFFBF]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          {/* <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
  );
}
