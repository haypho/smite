import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import { useGodsQuery } from "./api/smite/useGodsQuery";
import { filterByAbilityTypes, filterByRoles } from "../utils";

export const useFilteredGods = () => {
  const { data: gods } = useGodsQuery();
  const roles = useSelector((state: RootState) => state.filters.roles);
  const abilityTypes = useSelector(
    (state: RootState) => state.filters.abilityTypes,
  );

  return useMemo(
    () =>
      gods
        ?.filter(filterByRoles(roles))
        .filter(filterByAbilityTypes(abilityTypes)) ?? [],
    [abilityTypes, gods, roles],
  );
};
