import { Button } from "@/components/ui/button";
import React from "react";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import UserList from "./user-list";
import Table from "@/components/ui/custom-table";

export default function UserTable() {
  const tableHeader = ["Name", "Email", "Role", "Joined", "Status"];

  return (
    <Table headers={tableHeader}>
      <UserList />
    </Table>
  );
}
