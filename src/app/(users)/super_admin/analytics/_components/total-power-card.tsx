import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import TotalPowerChart from "./total-power-chart";

export default function TotalPowerCard() {
  return (
    <Card shadow="none" className="">
      <CardHeader>
        <div className="w-full">
          <p className="font-semibold">Total Power Chart</p>
          <p className="text-sm font-medium text-foreground-400">
            Energy Import and Export
          </p>
        </div>
      </CardHeader>

      <CardBody>
        <div className="h-[400px] overflow-hidden">
          <TotalPowerChart />
        </div>
      </CardBody>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
