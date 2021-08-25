import md5 from "md5";
import { SmiteMethod } from "../models/smite.method";
import { DEVELOPER_ID, AUTH_KEY } from "../config";
import { SMITE_BASE_URL, SMITE_CONTENT_TYPE, SMITE_SESSION_TTL_IN_MINUTES } from "../constants/smite.constants";
import { SmiteGod, SmiteGodData } from "../models";
import smiteGods from "../assets/gods.json";
import { SmiteLanguageCode } from "../models/smite.languageCode";

/**
 * The core service for the Smite API.
 */
export class SmiteService {
  /**
   * The current session id that is being used. This value will be updated along with the expiration date.
   * @default ""
   */
  private static sessionId: string = "";

  /**
   * The current expiration date for the session.
   * @default Date.now()
   */
  private static sessionExpirationDate: number = Date.now();

  /**
   * Creates the formatted timestamp for the Smite API
   * @returns the current timestamp in yyyyMMddHHmmss format
   */
  public static getTimestampUTC(): string {
    const now = new Date();
    const year = `${now.getUTCFullYear()}`.padStart(4, '0');
    const month = `${now.getUTCMonth() + 1}`.padStart(2, '0'); // Zero-indexed
    const date = `${now.getUTCDate()}`.padStart(2, '0');
    const hours = `${now.getUTCHours()}`.padStart(2, '0');
    const minutes = `${now.getUTCMinutes()}`.padStart(2, '0');
    const seconds = `${now.getUTCSeconds()}`.padStart(2, '0');
    return `${year}${month}${date}${hours}${minutes}${seconds}`;
  }

  /**
   * Create the MD5 has of the method parameter.
   * @param {SmiteMethod} method The string to hash using the MD5 algorithm
   * @returns The MD5 hash of the method
   */
  public static getSignature(method: SmiteMethod): string {
    const timestamp = SmiteService.getTimestampUTC();
    return md5(`${DEVELOPER_ID}${method}${AUTH_KEY}${timestamp}`);
  }

  /**
   */
  public static async getSessionAsync(): Promise<string> {
    if (SmiteService.sessionId && SmiteService.sessionExpirationDate < Date.now()) {
      return SmiteService.sessionId;
    }
    const signature: string = SmiteService.getSignature(SmiteMethod.CREATE_SESSION);
    const timestamp: string = SmiteService.getTimestampUTC();
    const url: string = `${SMITE_BASE_URL}/${SmiteMethod.CREATE_SESSION}${SMITE_CONTENT_TYPE}/${DEVELOPER_ID}/${signature}/${timestamp}`
    const res: Response = await fetch(url);
    const { session_id: sessionId, ret_msg: returnMessage } = await res.json();
    if (!sessionId || returnMessage !== "Approved") {
      throw new Error(`Session ID: "${sessionId}" ${returnMessage}`);
    }
    SmiteService.updateSession(sessionId);
    return sessionId;
  }

  /**
   * Fetches the smite gods from the Smite API
   * @returns {SmiteGod[]} The array of smite god information
   */
   public static async fetchGods(): Promise<SmiteGod[]> {
    const signature: string = SmiteService.getSignature(SmiteMethod.GET_GODS);
    const timestamp: string = SmiteService.getTimestampUTC();
    const sessionId: string = await SmiteService.getSessionAsync();
    const url: string = `${SMITE_BASE_URL}/${SmiteMethod.GET_GODS}${SMITE_CONTENT_TYPE}/${DEVELOPER_ID}/${signature}/${sessionId}/${timestamp}/${SmiteLanguageCode.ENGLISH}`;
    const res: Response = await fetch(url);
    return await res.json();
  }

  /**
   * Fetches the smite gods from the gods.json asset.
   * @returns {SmiteGod[]} The array of smite god information
   */
   public static getGods(): SmiteGod[] {
    return smiteGods.map((smiteGod: SmiteGodData) => ({
      ability1URL: smiteGod.godAbility1_URL,
      ability2URL: smiteGod.godAbility2_URL,
      ability3URL: smiteGod.godAbility3_URL,
      ability4URL: smiteGod.godAbility4_URL,
      ability5URL: smiteGod.godAbility5_URL,
      godCardURL: smiteGod.godCard_URL,
      godIconURL: smiteGod.godIcon_URL,
      lore: smiteGod.Lore,
      name: smiteGod.Name,
      pantheon: smiteGod.Pantheon,
      roles: smiteGod.Roles.split(",").map((role: string) => role.trim()),
      title: smiteGod.Title,
    }));
  }

  public static getRoles(): string[] {
    return SmiteService.getGods().reduce((roles: string[], smiteGod: SmiteGod) => {
      smiteGod.roles.forEach((role: string) => {
        if (!roles.includes(role)) {
          roles.push(role);
        }
      });
      return roles;
    }, ["Any"]);
  }

  /**
   * Updates the static session id and expiration date
   * @param {string} sessionId - The new session id to update the static variable
   */
  private static updateSession(sessionId: string): void {
    const expiration: Date = new Date();
    expiration.setMinutes(expiration.getMinutes() + SMITE_SESSION_TTL_IN_MINUTES);
    SmiteService.sessionExpirationDate = expiration.getTime();
    SmiteService.sessionId = sessionId;
  }
}
