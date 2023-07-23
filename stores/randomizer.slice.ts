import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SmiteGod } from "../api/smite/types";

export type RandomizerState = {
  randomGods: SmiteGod[];
};

const initialState: RandomizerState = {
  randomGods: [],
};

export const randomizerSlice = createSlice({
  name: "randomizerSlice",
  initialState,
  reducers: {
    setRandomGods: (state, action: PayloadAction<SmiteGod[]>) => {
      state.randomGods = action.payload;
    },
  },
});
