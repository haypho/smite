import axios from "axios";
import { formatRequestURL } from "./smite.utils";
import { SmiteMethod } from "./smite.constants";

export class SessionCache {
  private static sessionId: string = "";

  public static async getSessionId(): Promise<string> {
    if (await this.hasValidSessionId()) return this.sessionId;
    const url = formatRequestURL({ method: SmiteMethod.CREATE_SESSION });
    const { data } = await axios.get(url.href);
    const { session_id: sessionId, ret_msg: returnMessage } = data;
    if (!sessionId || returnMessage !== "Approved") {
      throw new Error(`Unable to fetch session: ${returnMessage}`);
    }
    this.sessionId = sessionId;
    return this.sessionId;
  }

  private static async hasValidSessionId(): Promise<boolean> {
    if (!this.sessionId) return false;
    const url = formatRequestURL({
      method: SmiteMethod.TEST_SESSION,
      sessionId: this.sessionId,
    });
    return axios
      .get(url.href)
      .then((res) => res.data.includes("Success"))
      .catch(() => false);
  }
}
