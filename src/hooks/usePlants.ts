import { NewPlant } from "@/db/schema/plant";
import readUserSession from "@/lib/actions";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const fetchPlants = async (relations: { isUser: boolean }) => {
  const { data: userSession } = await readUserSession();
  const authId = userSession.session?.user.id;

  if (relations.isUser) {
    return axios.get(`/api/users/${authId}/plants?is_user=true`);
  }

  return axios.get(`/api/users/${authId}/plants`);
};

const createPlant = async (data: NewPlant) => {
  const { data: userSession } = await readUserSession();
  const authId = userSession.session?.user.id;

  return axios.post(`/api/users/${authId}/plants`, data);
};

export const usePlants = (
  relations: {
    isUser: boolean;
  } = { isUser: false }
) => {
  return useQuery({
    queryKey: ["plants"],
    queryFn: () => fetchPlants(relations),
  });
};

export const useCreatePlant = () => {
  return useMutation({
    mutationFn: createPlant,
  });
};
