import { NewDevice } from "@/db/schema/device";
import readUserSession from "@/lib/actions";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const fetchDevices = async (relations: { isPlant: boolean }) => {
  const { data: userSession } = await readUserSession();
  const authId = userSession.session?.user.id;

  if (relations.isPlant) {
    return axios.get(`/api/users/${authId}/devices?is_plant=true`);
  }

  return axios.get(`/api/users/${authId}/devices`);
};

const createDevice = async (data: NewDevice) => {
  const { data: userSession } = await readUserSession();
  const authId = userSession.session?.user.id;

  return axios.post(`/api/users/${authId}/devices`, data);
};

export const useDevices = (
  relations: {
    isPlant: boolean;
  } = { isPlant: false }
) => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: () => fetchDevices(relations),
  });
};

export const useCreateDevice = () => {
  return useMutation({
    mutationFn: createDevice,
  });
};
