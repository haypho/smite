import { useSelector } from "react-redux";
import { SmiteGod } from "../../../api/smite/types";
import { useGodsQuery } from "../../../hooks/api/smite/useGodsQuery";
import { RootState } from "../../../stores/store";
import { mapToUniqueIntWithInclusiveRange } from "../utils/integerUtils";
import { useState } from "react";

export const useRandomGods = () => {
  const [_, setRandomizeToggle] = useState<boolean>(false);
  const cardCount = useSelector(
    (state: RootState) => state.randomizer.cardCount,
  );
  const { data } = useGodsQuery();

  const smiteGods: SmiteGod[] = !data
    ? []
    : new Array(cardCount)
      .fill(0)
      .map(mapToUniqueIntWithInclusiveRange([0, data.length - 1]))
      .map((index) => data[index]);

  return {
    smiteGods,
    randomize: () => setRandomizeToggle((prev) => !prev),
  };
};
