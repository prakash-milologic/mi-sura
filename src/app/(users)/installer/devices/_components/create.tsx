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
import axios, { AxiosError } from "axios";
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

function createDevice(data: any) {
  return axios.post(`/api/devices`, data);
}

function fetchPlants() {
  return axios.get(`/api/plants`);
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.enum(["INVT", "SUNGROW"]), // list of current available inverter brands for mi-suria
  serial: z.string().min(1, "Required"),
  plantId: z.string().nullable(),
});

export default function CreateDevice() {
  const brands = ["INVT", "SUNGROW"];

  const { data: plants, isLoading: isLoadingPlants } = useQuery({
    queryKey: ["plants"],
    queryFn: fetchPlants,
  });
  //   console.log("plants", plants);

  const { mutate } = useMutation({
    mutationFn: createDevice,
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "INVT",
      serial: "",
      plantId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);

    mutate(
      {
        ...values,
        plantId: values.plantId ? Number(values.plantId) : null,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["devices"] });
          toast({
            title: "Success",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Successfully create device</code>
              </pre>
            ),
          });
        },
        onError: async (error: any) => {
          toast({
            title: "Failed",
            variant: "destructive",
            description: error.response?.data?.message,
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
      <DialogTrigger asChild disabled={isLoadingPlants}>
        <Button variant="outline">Create Device</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create device</DialogTitle>
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
              name="serial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Serial Number<span className="text-destructive">*</span>
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
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plant</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (value === "none") {
                        form.setValue("plantId", null);
                      } else {
                        form.setValue("plantId", value);
                      }
                    }}
                    defaultValue={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"none"}>None</SelectItem>
                      {plants?.data?.map((plant: any) => (
                        <SelectItem
                          key={String(plant?.id)}
                          value={String(plant?.id)}
                        >
                          {plant?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
