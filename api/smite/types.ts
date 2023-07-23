import { Role } from "../../features/filter/types/filterTypes";

export type MenuItem = {
  description: string;
  value: string;
};

export type AbilityDescription = {
  itemDescription: {
    cooldown: `${bigint}s`;
    cost: `${bigint}/${bigint}/${bigint}/${bigint}/${bigint}`;
    description: string;
    menuitems: MenuItem[];
    rankitems: MenuItem[];
  };
};

export type Ability = {
  Description: AbilityDescription;
  Id: number;
  Summary: string;
  URL: string;
};

export type SmiteGod = {
  Ability1: string;
  Ability2: string;
  Ability3: string;
  /**
   * Ultimate ability
   * @example "Fatal Strike"
   */
  Ability4: string;
  /**
   * Passive ability
   * @example "Gift of the Gods"
   */
  Ability5: string;
  AbilityId1: number;
  AbilityId2: number;
  AbilityId3: number;
  AbilityId4: number;
  AbilityId5: number;
  Ability_1: Ability;
  Ability_2: Ability;
  Ability_3: Ability;
  Ability_4: Ability;
  Ability_5: Ability;
  /** @example 0.95 */
  AttackSpeed: number;
  /** @example 0.012 */
  AttackSpeedPerLevel: number;
  AutoBanned: "y" | "n";
  Cons: string;
  /** @example 0.75 */
  HP5PerLevel: number;
  Health: number;
  HealthPerFive: number;
  HealthPerLevel: number;
  Lore: string;
  MP5PerLevel: number;
  MagicProtection: number;
  MagicProtectionPerLevel: number;
  MagicalPower: number;
  MagicalPowerPerLevel: number;
  Mana: number;
  ManaPerFive: number;
  ManaPerLevel: number;
  Name: string;
  OnFreeRotation: "" | "true";
  Pantheon: string;
  PhysicalPower: number;
  PhysicalPowerPerLevel: number;
  PhysicalProtection: number;
  PhysicalProtectionPerLevel: number;
  Pros: string;
  Roles: string;
  Speed: number;
  Title: string;
  /** @example "Melee, Physical" */
  Type: string;
  abilityDescription1: AbilityDescription;
  abilityDescription2: AbilityDescription;
  abilityDescription3: AbilityDescription;
  abilityDescription4: AbilityDescription;
  abilityDescription5: AbilityDescription;
  basicAttack: AbilityDescription;
  godAbility1_URL: string;
  godAbility2_URL: string;
  godAbility3_URL: string;
  godAbility4_URL: string;
  godAbility5_URL: string;
  godCard_URL: string;
  godIcon_URL: string;
  id: number;
  latestGod: "y" | "n";
  ret_msg: null;
};
