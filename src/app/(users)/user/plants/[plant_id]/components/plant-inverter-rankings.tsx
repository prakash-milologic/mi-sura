import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import { BarChart4, CircleDollarSign, Coins } from "lucide-react";
import InverterRankingsTable from "./inverter-rankings-table";

export default function PlantInverterRankings() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Inverter Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <InverterRankingsTable />
      </CardContent>
    </Card>
  );
}
