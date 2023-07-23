import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";
import { useGodAbilityTypes } from "../../hooks/useGodAbilityTypes";
import { AppDispatch, RootState, filtersSlice } from "../../stores";
import { useDispatch, useSelector } from "react-redux";

export const AbilityTypeFilter = () => {
  const currentAbilityTypes = useSelector(
    (state: RootState) => state.filters.abilityTypes,
  );
  const dispatch: AppDispatch = useDispatch();
  const abilityTypes = useGodAbilityTypes();

  return (
    <FormControl>
      <FormLabel id="filters-ability-types">Ability Types</FormLabel>
      <FormGroup>
        <Box display="flex" flexWrap="wrap">
          {abilityTypes?.map((abilityType) => (
            <FormControlLabel
              key={abilityType}
              control={
                <Checkbox
                  defaultChecked={currentAbilityTypes.includes(abilityType)}
                  onChange={(_, checked: boolean) =>
                    dispatch(
                      filtersSlice.actions[
                        checked ? "addAbilityType" : "removeAbilityType"
                      ](abilityType),
                    )
                  }
                />
              }
              label={abilityType}
            />
          ))}
        </Box>
      </FormGroup>
    </FormControl>
  );
};
