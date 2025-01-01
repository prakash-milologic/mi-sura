"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

export default function PlantListCard({
  plants,
  selectedPlant,
  setSelectedPlant,
}: {
  plants: any[];
  selectedPlant: number | null;
  setSelectedPlant: Dispatch<SetStateAction<number | null>>;
}) {
  return (
    <Card shadow="sm" className="h-[550px] rounded-r-none">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Select Plant</p>
        </div>
      </CardHeader>
      <CardBody>
        <ScrollArea className="h-screen">
          <div className="flex flex-col gap-2">
            {plants.map((plant) => (
              <button
                key={plant?.id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                  selectedPlant === plant?.id && "bg-muted"
                )}
                onClick={() => setSelectedPlant(plant?.id)}
              >
                {plant?.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
