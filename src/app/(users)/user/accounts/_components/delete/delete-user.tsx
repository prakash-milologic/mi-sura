"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteAccount } from "../../_actions";
import { toast } from "@/components/ui/use-toast";

export default function DeleteUser({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteAccount(id);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });

        return;
      }

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Successfully delete account</code>
          </pre>
        ),
      });
    });
  };

  return (
    <form action={onSubmit}>
      <Button variant="outline">
        <TrashIcon />
        Delete
      </Button>
    </form>
  );
}
