import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { FC, useMemo } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stores/store";
import { SmiteFilter } from "../types/smiteGodFilter";
import { getFilterOptions } from "../utils/filter.utils";
import filtersSlice from "../stores/filters.slice";

const AddButton = styled(Button)`
  margin-left: 1em;
`;

export const FilterAutocomplete: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const options = useMemo(
    (): SmiteFilter[] =>
      getFilterOptions().filter(
        (option) =>
          !filters.some(
            (filter) =>
              (filter.type === option.type && filter.value === option.value) ||
              (option.isUnique && filter.type === option.type),
          ),
      ),
    [filters],
  );

  return (
    <Box marginY={2}>
      <Autocomplete
        fullWidth
        multiple
        renderInput={(params) => (
          <TextField {...params} placeholder="Add a filter..." />
        )}
        options={options}
        getOptionLabel={(option) => `${option.type}: ${option.value}`}
        defaultValue={filters}
        onChange={(_, value) =>
          dispatch(filtersSlice.actions.updateFilters(value))
        }
      />
    </Box>
  );
};
