import React from "react";
import UserTable from "./components/user-table";
import CreateUserUi from "./components/create/create-user-ui";
import InviteUserUi from "./components/invite/invite-user-ui";
import AccountTable from "./components/account-table";

export default async function AccountsPage() {
  return (
    <div className="px-6 pb-4 space-y-5 w-full overflow-y-auto">
      <div className="flex gap-2">
        {/* <SearchMembers /> */}
        {/* <CreateUserUi /> */}
        <InviteUserUi />
      </div>
      {/* <UserTable /> */}
      <AccountTable />
    </div>
  );
}
