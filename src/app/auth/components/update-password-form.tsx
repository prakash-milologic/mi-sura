"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { PasswordInput } from "@/components/ui/password-input";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FormSchema = z.object({
  newPassword: z.string().min(1, {
    message: "New password is required.",
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirm password is required.",
  }),
});

export default function UpdatePasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      if (data.confirmPassword !== data.newPassword) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Password does not match</code>
            </pre>
          ),
        });
        return;
      }

      const { error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{sessionError.message}</code>
            </pre>
          ),
        });
        return;
      }

      const { data: updateData, error: errorUpdate } =
        await supabase.auth.updateUser({
          password: form.getValues("newPassword"),
        });

      if (errorUpdate) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{errorUpdate.message}</code>
            </div>
          ),
        });
        return;
      }

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] truncate rounded-md bg-slate-950 p-4">
            <code className="text-white">Password successfully updated</code>
          </pre>
        ),
      });

      const { error: permissionError } = await supabase
        .from("permission")
        .update({
          status: "active",
        })
        .eq("user_id", updateData.user.id);

      if (permissionError) {
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] truncate rounded-md bg-slate-950 p-4">
              <code className="text-white">{permissionError.message}</code>
            </pre>
          ),
        });
        return;
      }

      router.push("/auth");
    });
  }

  return (
    <Form {...form}>
      <div className="container mx-auto ">
        <div className="flex justify-center px-6 my-12 ">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-2xl shadow-gray-900 rounded-md">
            <div className="bg-[url('/solar-grid.jpg')] w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="font-sans px-8 mt-10 tracking-tight text-left">
                <div className="text-xl font-bold tracking-wide text-gray-700">
                  Update your password
                </div>
                <div className="tracking-tight text-sm font-extralight text-gray-700	">
                  Please enter your new password.
                </div>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-8 pb-8 mb-4 space-y-2 bg-white rounded"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="block mb-2 text-sm font-bold text-gray-700 ">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                          placeholder="******"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="block mb-2 text-sm font-bold text-gray-700 ">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                          placeholder="******"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mb-6 text-center">
                  <Button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  >
                    Update
                    <AiOutlineLoading3Quarters
                      className={cn("animate-spin", { hidden: !isPending })}
                    />
                  </Button>
                </div>

                {/* <div className="text-center">
                  <a
                    className="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                    href="/auth"
                  >
                    Login
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
