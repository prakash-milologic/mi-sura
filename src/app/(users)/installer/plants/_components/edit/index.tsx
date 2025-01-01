"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "lucide-react";
import { usePlants } from "@/hooks";
import { toast } from "@/components/ui/use-toast";
import AddressField from "../../create/_components/address-field";

function editPlant(id: string, data: any) {
  return axios.put(`/api/plants/${id}`, data);
}

function fetchPlant(id: string) {
  return axios.get(`/api/plants/${id}`);
}

function fetchPlants() {
  return axios.get(`/api/plants`);
}

const formSchema = z
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

export default function EditPlant({ id }: { id: string }) {
  const { data: plant, isLoading: isLoadingPlant } = useQuery({
    queryKey: ["plants", id],
    queryFn: () => fetchPlant(id),
    enabled: !!id,
  });

  //   const { data: plants, isLoading: isLoadingPlants } = useQuery({
  //     queryKey: ["plants"],
  //     queryFn: fetchPlants,
  //   });
  //   console.log("plants", plants);

  const { mutate } = useMutation({
    mutationFn: (variables: any) => editPlant(variables?.id, variables?.data),
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: plant?.data?.name,
      capacity: Number(plant?.data?.capacity || 0),
      address: plant?.data?.address,
      coordinates: plant?.data?.coordinates,
      userId: plant?.data?.user?.id ? String(plant.data?.user?.id) : null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(
      {
        id: id,
        data: {
          ...values,
          //   plantId: values.plantId ? Number(values.plantId) : null,
        },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["plants"] });

          toast({
            title: "Success",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Successfully edit plant</code>
              </pre>
            ),
          });
        },
      }
    );
  }

  const [open, setOpen] = useState(false);
  useEffect(() => {
    form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isLoadingPlant}>
        <Button variant="outline">Edit Plant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit plant</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
