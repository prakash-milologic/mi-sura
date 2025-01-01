import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { IPermission } from "@/lib/types";
import DialogFormUi from "../dialog-form-ui";
import EditUserForm from "./edit-user-form";

export default function EditUserUi({
  permission,
}: {
  permission: IPermission;
}) {
  return (
    <DialogFormUi
      id="update-trigger"
      title="Edit Account"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={<EditUserForm permission={permission} />}
    />
  );
}
