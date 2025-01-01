import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function fetchUserById(id: string) {
  return axios.get(`/api/users/${id}`);
}

export default function InstallerCell({ id }: { id: string }) {
  const { data: device, isLoading: isLoadingDevice } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
  });

  if (isLoadingDevice) return <div>Loading...</div>;

  return <div>{device?.data?.name}</div>;
}
