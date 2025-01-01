import { NewPlant } from "@/db/schema/plant";
import readUserSession from "@/lib/actions";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const fetchUsers = async () => {
  const { data: userSession } = await readUserSession();
  const authId = userSession.session?.user.id;

  return axios.get(`/api/users/${authId}/accounts`);
};

const fetchUsersByCreator = (creator_id: string) => {
  return axios.get(`/api/users?created_by=${creator_id}`);
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useUsersByCreator = (
  creator_id: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["users", "created_by", creator_id],
    queryFn: () => fetchUsersByCreator(creator_id),
    enabled,
  });
};
