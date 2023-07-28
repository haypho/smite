import { SmiteGod } from "../../api/smite/types";
import { FiltersState } from "../../stores";
import { Role, TeamBalance } from "../../types";
import { getRandomIntWithInclusiveRange } from "../integer.utils";
import {
  filterByAbilityTypes,
  filterByRoles,
  mapGodToRoles,
  mapGodsToRoles,
  mapRolesToRoleCounts,
} from "../smiteGod.utils";

export type GenerateRandomGodsOptions = FiltersState & {
  gods: SmiteGod[];
};

export const generateRandomGods = (
  event: MessageEvent<GenerateRandomGodsOptions>,
): void => {
  const { gods, teams, teamSize, teamBalance, roles, abilityTypes } =
    event.data;
  const availableGods = gods.filter(
    (god) =>
      filterByRoles(roles)(god) && filterByAbilityTypes(abilityTypes)(god),
  );
  const availableRoles = roles.length ? roles : mapGodsToRoles(gods);
  const initialRoleCounts = mapRolesToRoleCounts(availableRoles).map((rc) => ({
    ...rc,
    count: 0,
  }));
  const resultCount = Math.min(teams * teamSize, availableGods.length);
  const smiteGods: SmiteGod[] = new Array(resultCount)
    .fill(0)
    .reduce((currentGods: SmiteGod[]) => {
      const filteredGods =
        teamBalance !== TeamBalance.UNBALANCED
          ? availableGods.filter(filterByRoles(availableRoles))
          : availableGods;

      const roleCounts = mapRolesToRoleCounts(mapGodsToRoles(currentGods))
        .concat(initialRoleCounts)
        .reduce(
          (dedupedRoleCounts: { role: string; count: number }[], roleCount) => {
            const index = dedupedRoleCounts.findIndex(
              (rc) => rc.role === roleCount.role,
            );
            if (index < 0) {
              dedupedRoleCounts.push(roleCount);
            } else if (dedupedRoleCounts[index].count < roleCount.count) {
              dedupedRoleCounts[index] = roleCount;
            }
            return dedupedRoleCounts;
          },
          [],
        );
      const initialIndex = getRandomIntWithInclusiveRange([
        0,
        filteredGods.length - 1,
      ]);
      let index: number = initialIndex + 1;
      let roleCountLimit = 0;
      let currentGod: SmiteGod | undefined;
      let currentRoles: string[] = [];
      let isAlreadyIncluded: boolean;
      let isMismatchRole: boolean;
      do {
        index = (index + 1) % filteredGods.length;
        currentGod = filteredGods.at(index);
        currentRoles = roleCounts
          .filter((roleCount) => roleCount.count <= roleCountLimit)
          .map((roleCount) => roleCount.role);
        isAlreadyIncluded = currentGods.some(
          (god) => god.id === currentGod?.id,
        );
        isMismatchRole =
          teamBalance !== TeamBalance.UNBALANCED &&
          currentRoles.length > 0 &&
          !mapGodToRoles(currentGod).some((role) =>
            currentRoles.includes(role),
          );
        if (index === initialIndex) {
          roleCountLimit += 1;
        }
      } while (isAlreadyIncluded || isMismatchRole);

      if (currentGod) {
        currentGods.push(currentGod);
      }

      return currentGods;
    }, []);

  postMessage({
    randomGods: smiteGods,
    results: availableGods.length,
  });
};

addEventListener("message", generateRandomGods);
