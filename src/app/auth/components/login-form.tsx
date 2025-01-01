import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "../actions";
import { useState, useTransition } from "react";
import { Label } from "@radix-ui/react-label";
import { EyeIcon, EyeOffIcon, Link } from "lucide-react";
import Image from "next/image";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data);

      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });

        return;
      }

      router.push("/");

      // toast({
      //   title: "Success",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">Successfully login</code>
      //     </pre>
      //   ),
      // });
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
                  Welcome to Mi-Suria
                </div>
                <div className="tracking-tight text-sm font-extralight text-gray-700	">
                  Please Enter your Account details
                </div>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-8 pb-8 mb-4 bg-white rounded"
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <div className="flex justify-between">
                        <FormLabel className="block mb-2 text-sm font-bold text-gray-700">
                          Password
                        </FormLabel>
                      </div>
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

                <div className="mt-4 mb-4 ">
                  <div className="flex flex-row ">
                    <input
                      className="mr-2 leading-tight bg-white"
                      type="checkbox"
                      id="checkbox_id"
                    />
                    <label
                      className="text-sm text-gray-700"
                      htmlFor="checkbox_id"
                    >
                      Keep me logged in
                    </label>
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <Button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  >
                    Login
                    <AiOutlineLoading3Quarters
                      className={cn("animate-spin", { hidden: !isPending })}
                    />
                  </Button>
                </div>

                <div className="text-center">
                  <a
                    className="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                    href="/auth/forgot_password"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
