"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ChangePasswordForm from "./change-password-form";

export default function DialogChangePassword() {
  return (
    <Dialog>
      <div className="flex justify-end items-center">
        <DialogTrigger asChild>
          <Button className="w-fit" variant={"link"}>
            Change password
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[525px] dark:bg-gradient-dark">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  );
}
