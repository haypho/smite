import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SmiteFilter, SmiteFilterType } from "../types/smiteGodFilter";

export type FiltersState = {
  filters: SmiteFilter[];
};

const initialState: FiltersState = {
  filters: [
    {
      type: SmiteFilterType.TEAMS,
      value: 1,
    },
    {
      type: SmiteFilterType.TEAM_SIZE,
      value: 1,
    },
  ],
};

export default createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<SmiteFilter[]>) => {
      state.filters = action.payload;
    },
  },
});
