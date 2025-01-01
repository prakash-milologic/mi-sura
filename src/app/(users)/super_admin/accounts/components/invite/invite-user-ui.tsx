"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import DialogFormUi from "../dialog-form-ui";
import InviteUserForm from "./invite-user-form";

export default function InviteUserUi() {
  const [open, setOpen] = useState(false);
  return (
    <DialogFormUi
      id="invite-trigger"
      title="Invite User"
      Trigger={<Button variant="outline">Invite user</Button>}
      form={<InviteUserForm setOpen={setOpen} />}
      open={open}
      setOpen={setOpen}
    />
  );
}
