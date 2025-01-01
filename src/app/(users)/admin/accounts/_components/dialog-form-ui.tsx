import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { ReactNode } from "react";

export default function DialogFormUi({
  Trigger,
  id,
  title,
  form,
  open,
  setOpen,
}: {
  title: string;
  Trigger: ReactNode;
  id: string;
  form: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild id={id}>
        {Trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] dark:bg-gradient-dark">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when
          </DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}
