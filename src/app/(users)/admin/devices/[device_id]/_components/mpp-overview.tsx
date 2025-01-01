"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { fetchDeviceData } from "./utils";

export default function MPPOverview() {
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

  const getYieldToday = () => {
    let yieldToday = Number(deviceData?.data?.rtData?.[0]?.dpy);
    return Math.floor(yieldToday * 100) / 100;
  };

  const getTotalActivePower = () => {
    let totalActivePower = Number(deviceData?.data?.rtData?.[0]?.ap);
    return Math.floor(totalActivePower * 100) / 100;
  };

  const getTotalYield = () => {
    // let totalYield = Number(deviceData?.data?.rtData?.[0]?.tpy);
    let totalYield = Number(deviceData?.data?.rtData?.[0]?.dpy * 30 * 12);

    return Math.floor((totalYield / 10000) * 100) / 100;
  };

  const yieldToday = isNaN(getYieldToday()) ? "--" : String(getYieldToday());
  const totalActivePower = isNaN(getTotalActivePower())
    ? "--"
    : String(getTotalActivePower());
  const totalYield = isNaN(getTotalYield()) ? "--" : String(getTotalYield());

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="font-semibold">Overview</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-12">
          <MicroCardInfo title="Yield Today" value={yieldToday} unit="kWh" />
          <MicroCardInfo
            title="Total Active Power"
            value={totalActivePower}
            unit="W"
          />
          <MicroCardInfo title="Total Yield" value={totalYield} unit="MWh" />
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

type IMicroCardInfo = {
  title: string;
  value: string;
  unit: string;
};

function MicroCardInfo({ title, value, unit }: IMicroCardInfo) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-neutral-500 dark:text-neutral-400">{title}</div>
      <div className="font-semibold">
        {value} <span>{unit}</span>
      </div>
    </div>
  );
}
