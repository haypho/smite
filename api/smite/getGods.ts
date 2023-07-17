import axios from "axios";
import { SmiteMethod } from "./smite.constants";
import { formatRequestURL } from "./smite.utils";
import { SmiteGod } from "./types";
import { SessionCache } from "./sessionCache";

export const getGods = async (): Promise<SmiteGod[]> => {
  const sessionId = await SessionCache.getSessionId();
  const url = formatRequestURL({ method: SmiteMethod.GET_GODS, sessionId });
  const { data } = await axios.get<SmiteGod[]>(url.href);
  return data;
};
