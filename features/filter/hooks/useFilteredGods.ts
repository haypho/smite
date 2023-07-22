import { useSelector } from "react-redux";
import { useGodsQuery } from "../../../hooks/api/smite/useGodsQuery";
import { RootState } from "../../../stores/store";
import { SmiteFilterType } from "../types/smiteGodFilter";

export const useFilteredGods = () => {
  const { data } = useGodsQuery();
  const filters = useSelector((state: RootState) => state.filters.filters);

  if (!data) return [];

  const roleFilters = filters
    .filter((filter) => filter.type === SmiteFilterType.ROLE)
    .map((filter) => filter.value as string);

  return data.filter(
    (god) =>
      roleFilters.length <= 0 ||
      roleFilters.some((role) => god.Roles.includes(role)),
  );
};
