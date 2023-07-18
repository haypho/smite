import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RandomizerState = {
  cardCount: number;
};

const initialState: RandomizerState = {
  cardCount: 3,
};

export default createSlice({
  name: "randomizerSlice",
  initialState,
  reducers: {
    setCardCount: (state, action: PayloadAction<number>) => {
      state.cardCount = action.payload;
    },
  },
});
