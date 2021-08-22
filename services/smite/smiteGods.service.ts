import { DEVELOPER_ID } from "../../config";
import { SMITE_BASE_URL, SMITE_CONTENT_TYPE } from "../../constants/smite.constants";
import { SmiteGod, SmiteMethod } from "../../models";
import { SmiteLanguageCode } from "../../models/smite.languageCode";
import { SmiteService } from "./smite.service";

/**
 * Service to interact with the Smite gods data.
 */
export class SmiteGodsService {
  /**
   * Fetches the smite gods from the Smite API
   * @returns {SmiteGod[]} The array of smite god information
   */
  public static async getGods(): Promise<SmiteGod[]> {
    const signature: string = SmiteService.getSignature(SmiteMethod.GET_GODS);
    const timestamp: string = SmiteService.getTimestampUTC();
    const sessionId: string = await SmiteService.getSessionAsync();
    const url: string = `${SMITE_BASE_URL}/${SmiteMethod.GET_GODS}${SMITE_CONTENT_TYPE}/${DEVELOPER_ID}/${signature}/${sessionId}/${timestamp}/${SmiteLanguageCode.ENGLISH}`;
    const res: Response = await fetch(url);
    return await res.json();
  }
}