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
import { FormPlantType } from "../page";
import { useUsers, useUsersByCreator } from "@/hooks/useUsers";
import readUserSession from "@/lib/actions";

export default function UserField({
  form,
  field,
}: {
  form: UseFormReturn<FormPlantType, any, undefined>;
  field: ControllerRenderProps<FormPlantType, "userId">;
}) {
  const { data: users } = useUsers();

  const items: {
    label: string;
    value: string;
  }[] =
    users?.data.map((user: any) => ({
      label: user.email,
      value: user.id,
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
              : "Select user"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value={"None"}
              onSelect={() => {
                form.setValue("userId", null);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  field.value ? "opacity-0" : "opacity-100"
                )}
              />
              {"None"}
            </CommandItem>
            {items.map((item) => (
              <CommandItem
                value={item.label}
                key={item.value}
                onSelect={() => {
                  form.setValue("userId", item.value);
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
