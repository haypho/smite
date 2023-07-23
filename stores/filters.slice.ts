import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role, TeamBalance } from "../types/filterTypes";

export type FiltersState = {
  teams: number;
  teamSize: number;
  teamBalance: TeamBalance;
  roles: Role[];
  abilityTypes: string[];
  isDrawerOpen: boolean;
};

const initialState: FiltersState = {
  isDrawerOpen: false,
  teams: 1,
  teamSize: 3,
  teamBalance: TeamBalance.SEMI_BALANCED,
  roles: [],
  abilityTypes: [],
};

export const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    updateTeams: (state, action: PayloadAction<number>) => {
      state.teams = action.payload;
    },
    updateTeamSize: (state, action: PayloadAction<number>) => {
      state.teamSize = action.payload;
    },
    updateTeamBalance: (state, action: PayloadAction<TeamBalance>) => {
      state.teamBalance = action.payload;
    },
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles = state.roles
        .filter((role) => role !== action.payload)
        .concat([action.payload]);
    },
    removeRole: (state, action: PayloadAction<Role>) => {
      state.roles = state.roles.filter((role) => role !== action.payload);
    },
    addAbilityType: (state, action: PayloadAction<string>) => {
      state.abilityTypes = state.abilityTypes
        .filter((abilityType) => abilityType !== action.payload)
        .concat([action.payload]);
    },
    removeAbilityType: (state, action: PayloadAction<string>) => {
      state.abilityTypes = state.abilityTypes.filter(
        (abilityType) => abilityType !== action.payload,
      );
    },
    hideDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    showDrawer: (state) => {
      state.isDrawerOpen = true;
    },
  },
});
