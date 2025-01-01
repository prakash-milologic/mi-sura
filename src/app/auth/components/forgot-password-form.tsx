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
import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { forgotPasswordV2 } from "../actions";

// Initialize supabase only on the client-side
let supabase;
if (typeof window !== "undefined") {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const FormSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await forgotPasswordV2({
        ...data,
        redirectTo: `${window.location.origin}`,
      });

      const { rejected } = JSON.parse(result);

      if (rejected?.length) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{"Something went wrong!"}</code>
            </pre>
          ),
        });
        return;
      }

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] truncate rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Reset password link successfully sent
            </code>
          </pre>
        ),
      });

      setSuccessMessage(
        `Reset password mail has been sent to ${data.email}. You should receive the link if the email provided is valid and has been registered on MI-Suria.`
      );
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
                  Forgot your password?
                </div>
                <div className="tracking-tight text-sm font-extralight text-gray-700	">
                  Please enter your email. We will send reset password mail to
                  you.
                </div>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-8 pb-8 mb-4 space-y-2 bg-white rounded"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="block mb-2 text-sm font-bold text-gray-700 ">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                          type="email"
                          placeholder="Email  "
                          {...field}
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
                    Send Link
                    <AiOutlineLoading3Quarters
                      className={cn("animate-spin", { hidden: !isPending })}
                    />
                  </Button>
                </div>

                {successMessage && (
                  <div className="border p-2 rounded text-sm text-neutral-700 font-medium bg-yellow-200">
                    {successMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
