import { Button } from "@/components/ui/button";
import React from "react";
import DialogFormUi from "../dialog-form-ui";
import CreateUserForm from "./create-user-form";

export default function CreateUserUi() {
  return (
    <DialogFormUi
      id="create-trigger"
      title="Create Account"
      Trigger={<Button variant="outline">Create +</Button>}
      form={<CreateUserForm />}
    />
  );
}
