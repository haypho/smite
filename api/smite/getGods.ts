import axios from "axios";
import { SmiteMethod } from "./smite.constants";
import { formatRequestURL } from "./smite.utils";
import { SmiteGod } from "./types";

export const getGods = async (sessionId: string): Promise<SmiteGod[]> => {
  const url = formatRequestURL({ method: SmiteMethod.GET_GODS, sessionId });
  const { data } = await axios.get<SmiteGod[]>(url.href);
  return data;
};
