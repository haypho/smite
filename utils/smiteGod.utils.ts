import { SmiteGod } from "../api/smite/types";
import { Role } from "../types";

export const getAbilityTypes = (god: SmiteGod): string[] => {
  const abilityKeys = [
    "Ability_1",
    "Ability_2",
    "Ability_3",
    "Ability_4",
    "Ability_5",
  ] satisfies Array<keyof SmiteGod>;

  return Array.from(
    abilityKeys.reduce((abilityTypes: Set<string>, abilityKey) => {
      god[abilityKey].Description.itemDescription.menuitems.forEach(
        (menuItem) => {
          if (menuItem.description.toLowerCase().includes("ability type")) {
            menuItem.value.split(",").forEach((abilityType) => {
              abilityTypes.add(abilityType.trim());
            });
          }
        },
      );
      return abilityTypes;
    }, new Set<string>()),
  );
};

export const filterByRoles =
  (roles: Role[]) =>
  (god: SmiteGod): boolean => {
    const godRoles = god.Roles.split(",").map((role) => role.trim());
    return roles.some((role) => godRoles.includes(role));
  };

export const filterByAbilityTypes =
  (abilityTypes: string[]) =>
  (god: SmiteGod): boolean => {
    const godAbilityTypes = getAbilityTypes(god);
    return abilityTypes.some((abilityType) =>
      godAbilityTypes.includes(abilityType),
    );
  };
