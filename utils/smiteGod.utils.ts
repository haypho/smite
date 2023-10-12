import { SmiteGod } from "../api/smite/types";

export type AbilityTypes =
  | "Ability_1"
  | "Ability_2"
  | "Ability_3"
  | "Ability_4"
  | "Ability_5";

export const mapGodToAbilityTypes = (
  god: Pick<SmiteGod, AbilityTypes>,
): string[] => {
  const abilityKeys = [
    "Ability_1",
    "Ability_2",
    "Ability_3",
    "Ability_4",
    "Ability_5",
  ] satisfies Array<keyof SmiteGod>;

  return Array.from(
    abilityKeys.reduce((abilityTypes: Set<string>, abilityKey) => {
      god[abilityKey].Description?.itemDescription.menuitems.forEach(
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

export const filterByRole =
  (role: string) =>
  (god: Pick<SmiteGod, "Roles">): boolean =>
    !role || mapGodToRoles(god).includes(role);

export const filterByRoles =
  (roles: string[]) =>
  (god: Pick<SmiteGod, "Roles">): boolean =>
    roles.length <= 0 ||
    mapGodToRoles(god).some((godRole) => roles.includes(godRole));

export const filterByAbilityTypes =
  (abilityTypes: string[]) =>
  (god: Pick<SmiteGod, AbilityTypes>): boolean =>
    abilityTypes.length <= 0 ||
    mapGodToAbilityTypes(god).some((abilityType) =>
      abilityTypes.includes(abilityType),
    );

export const mapGodToRoles = (god?: Pick<SmiteGod, "Roles">): string[] =>
  god?.Roles.split(",").map((role) => role.trim()) ?? [];

export const mapGodsToRoles = (gods: Pick<SmiteGod, "Roles">[]): string[] =>
  Array.from(
    gods.flatMap(mapGodToRoles).reduce((roles: Set<string>, role: string) => {
      roles.add(role);
      return roles;
    }, new Set()),
  );

export const mapRolesToRoleCounts = (
  roles: string[],
): { role: string; count: number }[] =>
  roles.reduce(
    (roleCounts: { role: string; count: number }[], role: string) => {
      const index = roleCounts.findIndex(
        (roleCount) => roleCount.role === role,
      );
      if (index < 0) {
        roleCounts.push({ role, count: 1 });
      } else {
        roleCounts[index] = { role, count: roleCounts[index].count + 1 };
      }
      return roleCounts;
    },
    [],
  );
