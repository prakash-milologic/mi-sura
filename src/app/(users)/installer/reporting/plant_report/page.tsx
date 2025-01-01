"use client";
import axios from "axios";
import PlantListCard from "./_components/plant-list-card";
import PlantReportCard from "./_components/plant-report-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function fetchPlants() {
  return axios.get(`/api/plants`);
}

export default function PlantReportPage() {
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
    <div className="px-6 space-y-5">
      <div className="grid grid-cols-4 gap-x-1">
        <div className="col-span-1">
          <PlantListCard
            plants={plants?.data}
            selectedPlant={selectedPlant}
            setSelectedPlant={setSelectedPlant}
          />
        </div>

        <div className="col-span-3">
          <PlantReportCard selectedPlant={selectedPlant} />
        </div>
      </div>
    </div>
  );
}
