import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { randomizerSlice } from "../features/randomizer";

export const store = configureStore({
  reducer: combineReducers({
    randomizer: randomizerSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
