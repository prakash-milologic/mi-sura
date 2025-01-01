"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { bulkDeleteAccount, deleteAccount } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function BulkDeleteUser({
  ids,
  resetRowSelection,
}: {
  ids: string[];
  resetRowSelection: (defaultState?: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await bulkDeleteAccount(ids);
      const error = result.error;

      if (error) {
        toast({
          title: "Failed",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {error?.message || "Something went wrong"}
              </code>
            </pre>
          ),
        });
        return;
      }

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Successfully delete accounts</code>
          </pre>
        ),
      });

      resetRowSelection();
      await queryClient.invalidateQueries({ queryKey: ["accounts"] });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className="text-black dark:text-white"
        >
          {isPending ? (
            <Loader className="h-4 w-4" />
          ) : (
            <>
              <TrashIcon />
              Delete
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={onSubmit}>
            <AlertDialogAction
              type="submit"
              className="bg-red-500 text-white hover:bg-red-500 hover:bg-opacity-85"
            >
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
