import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import MeasuringPointParameter from "./_components/measuring-point-parameter";
import DeviceInformation from "./_components/device-information";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DeviceIdPage({
  params,
}: {
  params: { device_id: string };
}) {
  const { device_id } = params;

  return (
    <div className="px-6">
      <Card shadow="sm" className="h-[550px]">
        <CardHeader></CardHeader>
        <ScrollArea>
          <CardBody>
            <div>
              <MeasuringPointParameter />
              <DeviceInformation />
            </div>
          </CardBody>
        </ScrollArea>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
