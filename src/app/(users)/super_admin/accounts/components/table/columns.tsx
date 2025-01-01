"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import EditUserUi from "../edit/edit-user-ui";
import { IPermission } from "@/lib/types";
import DeleteUser from "../delete/delete-user";
import { Button } from "@/components/ui/button";
import BulkDeleteUser from "../delete/bulk-delete-user";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<IPermission & { auth_user_id: string }>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={
          row.original.role === "super-admin" ? false : row.getIsSelected()
        }
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        disabled={row.original.role === "super-admin" ? true : false}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },
    cell: ({ row }) => (
      <span
        className={cn(
          "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm"
        )}
      >
        {row.original.role}
      </span>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Joined" />;
    },
    cell: ({ row }) => (
      <div>{new Date(row.original.created_at).toDateString()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => (
      <span
        className={cn(
          " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
          {
            "text-green-600 px-4 dark:border-green-400 bg-green-200":
              row.original.status === "active",
            "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
              row.original.status === "inactive",
          }
        )}
      >
        {row.original.status}
      </span>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <>
        {row.original.auth_user_id === row.original.user_id ? null : (
          <DeleteUser id={row.original.user_id} />
        )}

        {row.original.auth_user_id === row.original.user_id ? (
          <EditUserUi permission={row.original} />
        ) : null}
      </>
    ),
  },
];
