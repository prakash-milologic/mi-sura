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
import { useCreatePlant } from "@/hooks";
import { AxiosError } from "axios";
import PlantField from "./_components/plant-field";
import { useCreateDevice } from "@/hooks/useDevices";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  serialNumber: z.string().min(1, "Required"),
  plantId: z.string().min(1, "Required"),
});

export type FormDeviceType = z.infer<typeof FormSchema>;

export default function CreateDevicePage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      serialNumber: "",
      plantId: "",
    },
  });

  const { mutate } = useCreateDevice();

  function onSuccess() {
    form.reset();
    toast({
      title: "Success",
      description: "New device created",
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

      mutate(
        { ...data, plantId: Number(data.plantId) },
        {
          onSuccess,
          onError,
        }
      );
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Inverter A" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="SN-11XXXX" type="text" {...field} />
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
          name="plantId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Plant</FormLabel>
              <FormControl>
                <PlantField form={form} field={field} />
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

        <Button
          type="submit"
          className="w-full flex gap-2 items-center"
          variant="outline"
        >
          Submit{" "}
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
