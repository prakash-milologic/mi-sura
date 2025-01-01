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

function editDevice(id: string, data: any) {
  return axios.put(`/api/devices/${id}`, data);
}

function fetchDevice(serialNumber: string) {
  return axios.get(`/api/devices/${serialNumber}`);
}

function fetchInstallers() {
  return axios.get(`/api/users?role=installer`);
}

const formSchema = z.object({
  createdBy: z.string(),
});

export default function EditDevice({ serialNumber }: { serialNumber: string }) {
  const { data: device, isLoading: isLoadingDevice } = useQuery({
    queryKey: ["devices", serialNumber],
    queryFn: () => fetchDevice(serialNumber),
    enabled: !!serialNumber,
  });
  //   console.log("device", device?.data);

  const { data: installers, isLoading: isLoadingInstallers } = useQuery({
    queryKey: ["users", { role: "installers" }],
    queryFn: fetchInstallers,
  });
  // console.log("installers", installers?.data);

  const { mutate } = useMutation({
    mutationFn: (variables: any) => editDevice(variables?.id, variables?.data),
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      createdBy: device?.data?.createdBy,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);

    mutate(
      {
        id: serialNumber,
        data: {
          ...values,
          plantId: null,
        },
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["devices_list"] }),
            queryClient.invalidateQueries({
              queryKey: ["devices", serialNumber],
            }),
          ]);

          toast({
            title: "Success",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Successfully edit device</code>
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
      <DialogTrigger asChild disabled={isLoadingDevice}>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit device</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Installer</FormLabel>
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
                      {installers?.data?.map((installer: any) => (
                        <SelectItem
                          key={String(installer?.user?.id)}
                          value={String(installer?.user?.id)}
                        >
                          {installer?.user?.name}
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
