import { useMemo } from "react";
import { useGodsQuery } from "./api/smite/useGodsQuery";
import { mapGodToAbilityTypes } from "../utils";

export const useGodAbilityTypes = () => {
  const { data } = useGodsQuery();

  return useMemo(
    () =>
      data &&
      Array.from(
        data.reduce((abilityTypes: Set<string>, god) => {
          const godAbilityTypes = mapGodToAbilityTypes(god);
          godAbilityTypes.forEach((abilityType) =>
            abilityTypes.add(abilityType),
          );
          return abilityTypes;
        }, new Set<string>()),
      ).sort(),
    [data],
  );
};
