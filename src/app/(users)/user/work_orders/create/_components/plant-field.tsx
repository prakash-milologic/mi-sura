"use client";
import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Command,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormDeviceType } from "../page";
import { usePlants } from "@/hooks";

export default function PlantField({
  form,
  field,
}: {
  form: UseFormReturn<FormDeviceType, any, undefined>;
  field: ControllerRenderProps<FormDeviceType, "plantId">;
}) {
  const { data: plants } = usePlants();

  const items: {
    label: string;
    value: string;
  }[] =
    plants?.data.map((plant: any) => ({
      label: plant.name,
      value: String(plant.id),
    })) || [];

  // console.log(items);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? items.find((item) => item.value === field.value)?.label
              : "Select plant"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search plant..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                value={item.label}
                key={item.value}
                onSelect={() => {
                  form.setValue("plantId", item.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    item.value === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
