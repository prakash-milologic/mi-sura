import React from "react";
import CreateUserUi from "./_components/create/create-user-ui";
import UserTable from "./_components/user-table";
import InviteUserUi from "./_components/invite/invite-user-ui";
import AccountTable from "./_components/accounts-table";

export default function AccountsPage() {
  return (
    <div className="space-y-5 pb-4">
      <div className="space-x-4">
        {/* <CreateUserUi /> */}
        <InviteUserUi />
      </div>

      {/* <UserTable /> */}
      <AccountTable />
    </div>
  );
}
