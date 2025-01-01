import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import React from "react";
import CardInfo from "./card-info";
import { BatteryFull, CircleDollarSign, DatabaseZap } from "lucide-react";
import CardInfoRow from "./card-info-row";

export default function CardInfoContainer() {
  return (
    <div>
      <Tabs defaultValue="daily" className="space-y-5">
        <TabsList className="grid grid-cols-3 w-fit">
          <TabsTrigger className="" value="daily">
            Daily
          </TabsTrigger>
          <TabsTrigger className="" value="monthly">
            Monthly
          </TabsTrigger>
          <TabsTrigger className="" value="yearly">
            Yearly
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <CardInfoRow period="daily" />
        </TabsContent>
        <TabsContent value="monthly">
          <CardInfoRow period="monthly" />
        </TabsContent>
        <TabsContent value="yearly">
          <CardInfoRow period="yearly" />
        </TabsContent>
        {/* <TabsContent value="year">
          <div className="grid grid-cols-3 space-x-5">
            <CardInfo
              title="Total Yield"
              value="17.19"
              unitValue="kWh"
              diffValue="10.2"
              unitDiffValue="%"
              status="down"
              logo={<BatteryFull size={40} className="text-foreground-400" />}
            />
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
