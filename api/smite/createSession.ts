import axios from "axios";
import { SmiteMethod } from "./smite.constants";
import { formatRequestURL } from "./smite.utils";

export const createSession = async (): Promise<string> => {
  const url = formatRequestURL({ method: SmiteMethod.CREATE_SESSION });
  const { data } = await axios.get(url.href);
  const { session_id: sessionId, ret_msg: returnMessage } = data;
  if (!sessionId || returnMessage !== "Approved") {
    throw new Error(`Unable to fetch session: ${returnMessage}`);
  }
  return sessionId;
};
