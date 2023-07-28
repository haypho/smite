import { useMemo } from "react";
import { useGodsQuery } from "./api/smite/useGodsQuery";
import { SmiteGod } from "../api/smite/types";

const abilityKeys = [
  "Ability_1",
  "Ability_2",
  "Ability_3",
  "Ability_4",
  "Ability_5",
] satisfies Array<keyof SmiteGod>;

export const useGodAbilityTypes = () => {
  const { data } = useGodsQuery();

  return useMemo(
    () =>
      data &&
      Array.from(
        data.reduce((abilityTypes: Set<string>, god) => {
          abilityKeys.forEach((key) => {
            god[key].Description.itemDescription.menuitems.forEach(
              (menuItem) => {
                if (
                  menuItem.description.toLowerCase().includes("ability type")
                ) {
                  menuItem.value.split(",").forEach((abilityType) => {
                    abilityTypes.add(abilityType.trim());
                  });
                }
              },
            );
          });
          return abilityTypes;
        }, new Set<string>()),
      ).sort(),
    [data],
  );
};
