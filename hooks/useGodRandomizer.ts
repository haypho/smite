import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, randomizerSlice } from "../stores";
import { useCallback, useEffect } from "react";
import { SmiteGod } from "../api/smite/types";
import type { GenerateRandomGodsOptions } from "../utils/web-worker/generateRandomGods";
import { useGodsQuery } from "./api/smite/useGodsQuery";

export const useGodRandomizer = () => {
  const { data: gods } = useGodsQuery();
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const randomize = useCallback(() => {
    if (!gods?.length) return;

    const worker = new Worker(
      new URL("../utils/web-worker/generateRandomGods", import.meta.url),
    );

    worker.onmessage = (
      event: MessageEvent<{ randomGods: SmiteGod[]; results: number }>,
    ) => {
      const { randomGods, results } = event.data;
      dispatch(randomizerSlice.actions.setRandomGods(randomGods));
      dispatch(randomizerSlice.actions.setResults(results));
      worker.terminate();
    };

    worker.onerror = () => {
      worker.terminate();
    };

    const options: GenerateRandomGodsOptions = {
      gods,
      ...filters,
    };
    worker.postMessage(options);

    return worker;
  }, [dispatch, filters, gods]);

  useEffect(() => {
    const worker = randomize();

    return () => {
      worker?.terminate();
    };
  }, [randomize]);

  return randomize;
};
