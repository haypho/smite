import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { randomizerSlice } from "../features/randomizer";
import filtersSlice from "../features/filter/stores/filters.slice";

export const store = configureStore({
  reducer: combineReducers({
    randomizer: randomizerSlice.reducer,
    filters: filtersSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
