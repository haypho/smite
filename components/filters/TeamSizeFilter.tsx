import { FormControl, FormLabel, Slider } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, filtersSlice } from "../../stores";

export const TeamSizeFilter = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <FormControl>
      <FormLabel id="filters-team-size">Team Size</FormLabel>
      <Slider
        aria-labelledby="filters-team-size"
        marks={[
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: 3,
            value: 3,
          },
          {
            label: 4,
            value: 4,
          },
          {
            label: 5,
            value: 5,
          },
        ]}
        min={1}
        max={5}
        defaultValue={3}
        onChangeCommitted={(_, value) =>
          dispatch(
            filtersSlice.actions.updateTeamSize(
              Array.isArray(value) ? value[0] : value,
            ),
          )
        }
      />
    </FormControl>
  );
};
