"use client";
import React from "react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { readAccounts } from "../actions";
import readUserSession from "@/lib/actions";

export default function AccountTable() {
  const { data: auth, isLoading: isLoadingAuth } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => await readUserSession(),
  });

  const { data: accountsByAuth, isLoading: isLoadingAccountsByAuth } = useQuery(
    {
      queryKey: ["accounts"],
      queryFn: async () => await readAccounts(),
    }
  );

  const auth_user_id = auth?.data.session?.user.id;

  const data = accountsByAuth?.data?.map((account) => ({
    ...account,
    auth_user_id,
  }));

  if (isLoadingAccountsByAuth) return <div>Loading...</div>;

  return <DataTable columns={columns} data={data || []} />;
}
