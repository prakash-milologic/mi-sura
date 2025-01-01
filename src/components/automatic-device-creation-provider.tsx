"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AutomaticDeviceCreationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchAutomaticDeviceCreation = () => {
    return axios.get(`/api/tsdb/automatic_device_creation`);
  };

  const { data: automaticDeviceCreation } = useQuery({
    queryKey: ["automatic_device_creation"],
    queryFn: fetchAutomaticDeviceCreation,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  // console.log("automaticDeviceCreation", automaticDeviceCreation?.data });

  return <div>{children}</div>;
}
