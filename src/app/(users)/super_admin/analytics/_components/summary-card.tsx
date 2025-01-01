import { Card, CardBody, CardHeader, Chip, cn } from "@nextui-org/react";
import {
  ArrowUp,
  ArrowDown,
  BatteryFull,
  CircleDollarSign,
  DatabaseZap,
} from "lucide-react";
import { title } from "process";
import CardInfoChart from "./card-info-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardInfo from "./card-info";
import TotalPowerCard from "./total-power-card";
import PlantListCard from "./plant-list-card";

export default function SummaryCard() {
  return (
    <Card shadow="sm" className="p-5">
      <CardHeader>
        <div className="w-full">
          <Tabs defaultValue="power" className="space-y-5">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger className="truncate justify-start" value="power">
                Total Power
              </TabsTrigger>
              <TabsTrigger className="truncate justify-start" value="yield">
                Total Yield
              </TabsTrigger>
              <TabsTrigger className="truncate justify-start" value="revenue">
                Total Revenue
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="power"
              className="grid grid-cols-1 xl:grid-cols-3"
            >
              <div className="col-span-1 xl:col-span-2">
                <TotalPowerCard />
              </div>

              <div className="col-span-1 xl:col-span-1">
                <PlantListCard />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardHeader>

      <CardBody></CardBody>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
