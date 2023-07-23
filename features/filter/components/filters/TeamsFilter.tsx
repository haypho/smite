import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { AppDispatch, RootState } from "../../../../stores/store";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../stores/filters.slice";

export const TeamsFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.filters.teams);

  return (
    <FormControl>
      <FormLabel id="filters-teams">Teams</FormLabel>
      <RadioGroup
        aria-labelledby="filters-teams"
        defaultValue={teams}
        onChange={(_, value) =>
          dispatch(filtersSlice.actions.updateTeams(Number(value)))
        }
      >
        <FormControlLabel value={1} control={<Radio />} label={1} />
        <FormControlLabel value={2} control={<Radio />} label={2} />
      </RadioGroup>
    </FormControl>
  );
};
