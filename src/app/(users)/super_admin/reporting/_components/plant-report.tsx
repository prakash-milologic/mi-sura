"use client";
import axios from "axios";
import PlantListCard from "./plant-list-card";
import PlantReportCard from "./plant-report-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import EnergyChart from "./energy-chart";

function fetchPlants() {
    return axios.get(`/api/plants`);
}

export default function PlantReportComponent() {
    const [selectedPlant, setSelectedPlant] = useState<number | null>(null);
    const { data: plants, isLoading: isLoadingPlants } = useQuery({
        queryKey: ["plants"],
        queryFn: fetchPlants,
    });

    useEffect(() => {
        setSelectedPlant(plants?.data?.[0]?.id);
    }, [plants]);

    if (isLoadingPlants) return <div className="px-6">Loading...</div>;

    return (
        <div className="bg-white dark: dark:bg-[#262629] ">
            <div className="py-8 px-6 ">
            <p className="text-base md:text-[32px] font-semibold text-[#171717] dark:text-white">Plant Report</p>
            <p className="text-xs md:text-sm text-[#686868] dark:text-white/80 font-normal mt-1">
                Select plants for comparison within a specific period and choose supplementary criteria.
            </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-x-1">
                <div className="col-span-1 lg:col-span-1">
                    <PlantListCard
                        plants={plants?.data}
                        selectedPlant={selectedPlant}
                        setSelectedPlant={setSelectedPlant}
                    />
                </div>

                <div className="col-span-1 lg:col-span-3 bg-[#F9FAFB]">
                    {/* <EnergyChart /> */}
                    <PlantReportCard selectedPlant={selectedPlant} />
                </div>
            </div>
        </div>
    );
}
