"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { createMember, updateMemberById } from "../../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
// import { createAccount } from "../../_actions";
import { useTransition } from "react";
import AddressField from "./_components/address-field";
import { useCreatePlant } from "@/hooks";
import { AxiosError } from "axios";
import UserField from "./_components/user-field";

const FormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    address: z.string().min(1, "Required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    userId: z.string().min(1, "Required"),
  })
  .refine((data) => data.address, {
    message: "Please select a valid address",
    path: ["address"],
  });

export type FormPlantType = z.infer<typeof FormSchema>;

export default function CreatePlantPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      userId: "",
    },
  });

  const { mutate } = useCreatePlant();

  function onSuccess() {
    form.reset();
    toast({
      title: "Success",
      description: "New plant created",
    });
  }

  function onError(error: Error) {
    console.log(error);
    const axiosError = error as AxiosError;
    const errorResponse: { message: string } = axiosError.response?.data as any;

    toast({
      title: "Error",
      variant: "destructive",
      description: errorResponse.message || error.message,
    });
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      // console.log(data);

      mutate(data, {
        onSuccess,
        onError,
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Plant A" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <AddressField field={field} form={form} />
                {/* <Input
                  placeholder="Plant A"
                  type="text"
                  {...field}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User</FormLabel>
              <FormControl>
                <UserField form={form} field={field} />
                {/* <Input
                  placeholder="Plant A"
                  type="text"
                  {...field}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full flex gap-2 items-center">
          Submit{" "}
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
