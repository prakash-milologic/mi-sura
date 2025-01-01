import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import {
  BadgeJapaneseYen,
  BarChart4,
  CalendarRange,
  CircleDollarSign,
  Cloud,
  Coins,
  EggFried,
  Router,
  Trees,
} from "lucide-react";
import InverterRankingsTable from "./inverter-rankings-table";
import colors from "tailwindcss/colors";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

function fetchPlantData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}`);
}

export default function PlantSystemSummary() {
  const { plant_id } = useParams<{ plant_id: string }>();

  const {
    data: plantData,
    isLoading: isLoadingPlantData,
    error: plantDataError,
  } = useQuery({
    queryKey: ["plant_data", plant_id],
    queryFn: () => fetchPlantData(plant_id),
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>System Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2">
        <div className="font-light flex items-baseline space-x-3">
          <Router size={20} />
          <div>
            <div>
              Inverter{" "}
              <span className="text-xl font-bold">
                {plantData?.data?.[0]?.totalDevice}
              </span>
            </div>
            <div className="flex space-x-3">
              <div>
                <span className="text-xl font-bold">0</span> Offline
              </div>
              <div>
                <span className="text-xl font-bold">0</span> Alerts
              </div>
            </div>
          </div>
        </div>

        <div className="font-light flex items-baseline space-x-3">
          <CalendarRange size={20} />
          <div>
            <div>
              Inverter{" "}
              <span className="text-xl font-bold">
                {plantData?.data?.[0]?.totalDevice}
              </span>
            </div>
            <div className="flex space-x-3">
              <div>
                <span className="text-xl font-bold">0</span> Offline
              </div>
              <div>
                <span className="text-xl font-bold">0</span> Alerts
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
