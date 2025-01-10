"use client";
import { LeftArrow } from "@/app/assets/SVGCollection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Card,
  CardBody,
  CardHeader
} from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

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
    <Card shadow="none" className="h-[300px] md:h-[550px] rounded-none bg-[#F9FAFB] dark:bg-[#333338]">
      <CardHeader className="p-4 md:p-6">
          <p className="text-base md:text-xl text-[#171717] dark:text-white font-semibold">Select Plant</p>
      </CardHeader>
      <ScrollArea className="h-screen">
      <CardBody className="px-6 py-0">
       
          <div className="flex flex-col flex-wrap gap-2">
            {plants.map((plant) => (
              <button
                key={plant?.id}
                className={cn(
                  "flex justify-between items-center gap-2 rounded-lg border px-3 py-2 md:px-4 md:py-[12.5px]  text-[#171717CC] dark:text-white/80 text-base transition-all bg-white dark:bg-[#43434A] font-normal hover:bg-accent dark:hover:bg-primary ",
                  selectedPlant === plant?.id && "bg-[#0098484D] text-[#00824A] dark:bg-[#006D49] dark:text-white",
                )}
                onClick={() => setSelectedPlant(plant?.id)}
              >
                <span>
                {plant?.name} 
                  </span>
                  {selectedPlant === plant?.id && <LeftArrow />}
              </button>
            ))}
          </div>
      </CardBody>
        </ScrollArea>
    </Card>
  );
}
