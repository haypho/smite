import { SmiteGod } from "../api/smite/types";

export const mapGodToAbilityTypes = (god: SmiteGod): string[] => {
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

export const filterByRole =
  (role: string) =>
    (god: SmiteGod): boolean =>
      !role || mapGodToRoles(god).includes(role);

export const filterByRoles =
  (roles: string[]) =>
    (god: SmiteGod): boolean =>
      roles.length <= 0 ||
      mapGodToRoles(god).some((godRole) => roles.includes(godRole));

export const filterByAbilityTypes =
  (abilityTypes: string[]) =>
    (god: SmiteGod): boolean =>
      abilityTypes.length <= 0 ||
      mapGodToAbilityTypes(god).some((abilityType) =>
        abilityTypes.includes(abilityType),
      );

export const mapGodToRoles = (god?: SmiteGod): string[] =>
  god?.Roles.split(",").map((role) => role.trim()) ?? [];

export const mapGodsToRoles = (gods: SmiteGod[]): string[] =>
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
