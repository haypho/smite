import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SmiteGod } from "../api/smite/types";

export type RandomizerState = {
  randomGods: SmiteGod[];
  results: number;
};

const initialState: RandomizerState = {
  randomGods: [],
  results: 0,
};

export const randomizerSlice = createSlice({
  name: "randomizerSlice",
  initialState,
  reducers: {
    setRandomGods: (state, action: PayloadAction<SmiteGod[]>) => {
      state.randomGods = action.payload;
    },
    setResults: (state, action: PayloadAction<number>) => {
      state.results = action.payload;
    },
  },
});
