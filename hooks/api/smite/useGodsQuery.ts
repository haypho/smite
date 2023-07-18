import { useQuery } from "@tanstack/react-query";
import { SmiteMethod } from "../../../api/smite/smite.constants";
import { useSessionQuery } from "./useSessionQuery";
import { getGods } from "../../../api/smite/getGods";

export const useGodsQuery = () => {
  const { data } = useSessionQuery();

  return useQuery({
    queryKey: [SmiteMethod.GET_GODS],
    queryFn: () => getGods(data!),
    enabled: !!data,
  });
};
