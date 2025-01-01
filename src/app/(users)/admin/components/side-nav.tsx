import React from "react";
import NavLinks from "./nav-links";
import { cn } from "@/lib/utils";
import SignOut from "./sign-out";
import readUserSession from "@/lib/actions";

export default function SideNav() {
  return <SideBar className=" hidden lg:block dark:bg-graident-dark flex-1" />;
}

export const SideBar = async ({ className }: { className?: string }) => {
  const { data: userSession } = await readUserSession();

  const authUserEmail = userSession.session?.user.email;

  return (
    <div className={className}>
      <div
        className={cn(
          "h-full w-full lg:w-60 lg:p-5 space-y-5 lg:border-r flex flex-col "
        )}
      >
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-3xl font-bold">MI Suria</h1>

            {/* <ModeToggle /> */}
          </div>
          Welcome, {authUserEmail}
          <NavLinks />
        </div>
        <div className="">
          <SignOut />
        </div>
      </div>
    </div>
  );
};
