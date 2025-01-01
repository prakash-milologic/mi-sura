"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import DialogFormUi from "../dialog-form-ui";
import CreateUserForm from "./create-user-form";

export default function CreateUserUi() {
  const [open, setOpen] = useState(false);

  return (
    <DialogFormUi
      open={open}
      setOpen={setOpen}
      id="create-trigger"
      title="Create Account"
      Trigger={<Button variant="outline">Create +</Button>}
      form={<CreateUserForm />}
    />
  );
}
