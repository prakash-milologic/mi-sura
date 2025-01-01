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
import axios, { AxiosError } from "axios";
import UserField from "./_components/user-field";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function fetchPlant(id: string) {
  return axios.get(`/api/plants/${id}`);
}

function editPlant(id: string, data: any) {
  return axios.put(`/api/plants/${id}`, data);
}

// function fetchUsers() {
//   return axios.get(`/api/users`);
// }

const FormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    capacity: z.coerce.number().min(0),
    address: z.string().min(1, "Required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    // userId: z.string().min(1, "Required"),
    userId: z.string().optional().nullable(),
  })
  .refine((data) => data.address, {
    message: "Please select a valid address",
    path: ["address"],
  });

export type FormPlantType = z.infer<typeof FormSchema>;

export default function EditPlantPage({
  params,
}: {
  params: { plant_id: string };
}) {
  const plantId = params.plant_id;
  const { data: plant, isLoading: isLoadingPlant } = useQuery({
    queryKey: ["plants", plantId],
    queryFn: () => fetchPlant(plantId),
    enabled: !!plantId,
  });

  // const { data: users, isLoading: isLoadingUsers } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchUsers,
  // });

  // console.log("users", users);

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      name: plant?.data?.name || "",
      capacity: Number(plant?.data?.capacity || 0),
      address: plant?.data?.address || "",
      coordinates: plant?.data?.coordinates || {
        lat: 0,
        lng: 0,
      },
      userId: plant?.data?.user?.id ? String(plant?.data?.user?.id) : null,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (variables: any) => editPlant(variables?.id, variables?.data),
  });
  const queryClient = useQueryClient();

  async function onSuccess() {
    await queryClient.invalidateQueries({ queryKey: ["plants"] });

    form.reset();
    toast({
      title: "Success",
      description: "Plant edited",
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

  function onSubmit(values: z.infer<typeof FormSchema>) {
    startTransition(() => {
      // console.log(values);

      mutate(
        {
          id: plantId,
          data: {
            ...values,
            //   plantId: values.plantId ? Number(values.plantId) : null,
          },
        },
        {
          onSuccess,
          onError,
        }
      );
    });
  }

  if (isLoadingPlant) return <div>Loading...</div>;

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
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity (kWp)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  // onChange={(e) => field.onChange(+e.target.value)}
                />
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
