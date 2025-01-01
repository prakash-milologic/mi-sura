"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { fetchDeviceData } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function DeviceDatarmation() {
  const { device_id: deviceId } = useParams<{ device_id: string }>();

  const {
    data: deviceData,
    isLoading: isLoadingDeviceData,
    error: errorDeviceData,
    refetch: refetchDeviceData,
  } = useQuery({
    queryKey: ["device_data", deviceId],
    queryFn: () => fetchDeviceData({ deviceId }),
    refetchInterval: 30000,
  });

  const deviceName = deviceData?.data?.name || "--";
  const sn = deviceData?.data?.serialNumber || "--";
  const manufacturer = deviceData?.data?.manufacturer || "--";
  const status = deviceData?.data?.status || "--";

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="text-lg font-semibold">Device Information</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-12">
          <MicroCardInfo
            title="Current Status"
            value={status}
            textTransform="capitalize"
          />
          <MicroCardInfo title="Device Name" value={deviceName} />
          <MicroCardInfo title="S/N" value={sn} />
          <MicroCardInfo
            title="Manufacturer"
            value={manufacturer}
            textTransform="uppercase"
          />
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

type IMicroCardInfo = {
  title: string;
  value: string;
  unit?: string;
  textTransform?: "capitalize" | "uppercase";
};

function MicroCardInfo({ title, value, unit, textTransform }: IMicroCardInfo) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-neutral-500 dark:text-neutral-400">{title}</div>
      <div className={cn("font-semibold", textTransform)}>
        {value} <span>{unit}</span>
      </div>
    </div>
  );
}
