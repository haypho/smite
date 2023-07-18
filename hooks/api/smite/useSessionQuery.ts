import { useQuery } from "@tanstack/react-query";
import {
  SMITE_SESSION_TTL_IN_MILLIS,
  SmiteMethod,
} from "../../../api/smite/smite.constants";
import { createSession } from "../../../api/smite/createSession";

export const useSessionQuery = () =>
  useQuery({
    queryKey: [SmiteMethod.CREATE_SESSION],
    queryFn: createSession,
    staleTime: SMITE_SESSION_TTL_IN_MILLIS,
    cacheTime: SMITE_SESSION_TTL_IN_MILLIS,
  });
