import { useDispatch, useSelector } from "react-redux";
import { SmiteGod } from "../../../api/smite/types";
import { AppDispatch, RootState } from "../../../stores/store";
import randomizerSlice from "../stores/randomizer.slice";
import { useCallback, useEffect } from "react";
import { useGodsQuery } from "../../../hooks/api/smite/useGodsQuery";
import { Role, TeamBalance } from "../../filter/types/filterTypes";
import { getRandomIntWithInclusiveRange } from "../utils/integerUtils";

export const useGodRandomizer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useGodsQuery();
  const teams = useSelector((state: RootState) => state.filters.teams);
  const teamSize = useSelector((state: RootState) => state.filters.teamSize);
  const teamBalance = useSelector(
    (state: RootState) => state.filters.teamBalance,
  );
  const roles = useSelector((state: RootState) => state.filters.roles);

  const availableGods = (data ?? []).filter(
    (god) =>
      roles.length <= 0 || roles.some((role) => god.Roles.includes(role)),
  );

  const randomize = useCallback(() => {
    if (!availableGods) return;

    const smiteGods: SmiteGod[] = new Array(teams * teamSize)
      .fill(0)
      .reduce((currentGods: SmiteGod[]) => {
        const initialRoleCounts: [Role, number][] = roles.map((role) => [
          role,
          0,
        ]);
        const nextRole = currentGods
          .flatMap((god) => god.Roles.split(",") as Role[])
          .reduce((roleCounts, role) => {
            const updatedRoleCounts: [Role, number][] = roleCounts.map(
              ([currentRole, currentCount]: [Role, number]) => [
                currentRole,
                currentCount + (currentRole === role ? 1 : 0),
              ],
            );
            return updatedRoleCounts.sort((a, b) => a[1] - b[1]);
          }, initialRoleCounts)[0]?.[0];
        if (nextRole && teamBalance !== TeamBalance.UNBALANCED) {
          const filteredGods = availableGods.filter((god) =>
            god.Roles.includes(nextRole),
          );
          let index = getRandomIntWithInclusiveRange([
            0,
            filteredGods.length - 1,
          ]);
          while (currentGods.some((god) => god.id === filteredGods[index].id)) {
            index = (index + 1) % filteredGods.length;
          }
          currentGods.push(filteredGods[index]);
        } else {
          let index = getRandomIntWithInclusiveRange([
            0,
            availableGods.length - 1,
          ]);
          while (
            currentGods.some((god) => god.id === availableGods[index].id)
          ) {
            index = (index + 1) % availableGods.length;
          }
          currentGods.push(availableGods[index]);
        }

        return currentGods;
      }, []);

    dispatch(randomizerSlice.actions.setRandomGods(smiteGods));
  }, [availableGods, teams, teamSize, dispatch, roles, teamBalance]);

  useEffect(() => {
    randomize();
  }, [randomize]);

  return randomize;
};
