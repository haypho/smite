import {
  FormControl,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeamBalance } from "../../types/filterTypes";
import { AppDispatch, RootState, filtersSlice } from "../../stores";

export const TeamBalanceFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const hasMoreThanOne = useSelector(
    (state: RootState) => state.filters.teamSize > 1,
  );
  const currentBalance = useSelector(
    (state: RootState) => state.filters.teamBalance,
  );

  if (!hasMoreThanOne) return null;

  return (
    <FormControl>
      <FormLabel id="filters-team-balance">Team Balance</FormLabel>
      <ToggleButtonGroup
        exclusive
        color="primary"
        value={currentBalance}
        onChange={(_, value) =>
          dispatch(filtersSlice.actions.updateTeamBalance(value))
        }
      >
        {[TeamBalance.BALANCED, TeamBalance.UNBALANCED].map((balance) => (
          <ToggleButton key={balance} value={balance} size="small">
            {balance}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
