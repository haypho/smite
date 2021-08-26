import { SmiteGod, SmiteGodData } from "../models";
import smiteGods from "../assets/gods.json";

/**
 * The core service for the Smite API.
 */
export class SmiteService {
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
}
