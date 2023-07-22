import { useDispatch, useSelector } from "react-redux";
import { SmiteGod } from "../../../api/smite/types";
import { AppDispatch, RootState } from "../../../stores/store";
import { mapToUniqueIntWithInclusiveRange } from "../utils/integerUtils";
import { SmiteFilterType } from "../../filter/types/smiteGodFilter";
import randomizerSlice from "../stores/randomizer.slice";
import { useEffect } from "react";
import { useFilteredGods } from "../../filter";

export const useGodRandomizer = () => {
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const teams =
    (filters.find((filter) => filter.type === SmiteFilterType.TEAMS)
      ?.value as number) ?? 1;
  const teamSize =
    (filters.find((filter) => filter.type === SmiteFilterType.TEAM_SIZE)
      ?.value as number) ?? 1;
  const gods = useFilteredGods();

  const randomize = () => {
    if (!gods) return;

    const smiteGods: SmiteGod[] = new Array(teams * teamSize)
      .fill(0)
      .map(mapToUniqueIntWithInclusiveRange([0, gods.length - 1]))
      .map((index) => gods[index]);

    dispatch(randomizerSlice.actions.setRandomGods(smiteGods));
  };

  useEffect(() => {
    randomize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return randomize;
};
