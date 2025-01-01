import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
// import EditMember from "./edit/EditMember";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { readAccounts } from "../actions";
import { IPermission } from "@/lib/types";
import DeleteUser from "./delete/delete-user";
import readUserSession from "@/lib/actions";
import EditUserUi from "./edit/edit-user-ui";

export default async function UserList() {
  const { data: userSession } = await readUserSession();
  const { data: permissions } = await readAccounts();

  const authUserId = userSession.session?.user.id;

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {(permissions as IPermission[])?.map((permission, index) => {
        return (
          <div
            className=" grid grid-cols-6 rounded-sm  p-3 align-middle font-normal"
            key={index}
          >
            <h1>{permission.user.name}</h1>
            <h1>{permission.user.email}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm"
                  // {
                  //   "border-green-500 text-green-600 bg-green-200":
                  //     permission.role === "admin",
                  //   "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                  //     permission.role === "user",
                  // }
                )}
              >
                {permission.role}
              </span>
            </div>
            <h1>{new Date(permission.created_at).toDateString()}</h1>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      permission.status === "active",
                    "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
                      permission.status === "inactive",
                  }
                )}
              >
                {permission.status}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              {authUserId === permission.user_id ? null : (
                <DeleteUser id={permission.user_id} />
              )}

              {authUserId === permission.user_id ? (
                <EditUserUi permission={permission} />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
