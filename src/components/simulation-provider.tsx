"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SimulationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchSimulationDevices = () => {
    return axios.get(`/api/test`);
  };

  const { data: simulationDevices } = useQuery({
    queryKey: ["test"],
    queryFn: fetchSimulationDevices,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  // console.log({ simulationdevices: simulationDevices?.data });

  return <div>{children}</div>;
}
