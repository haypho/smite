import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { TeamsFilter } from "./filters/TeamsFilter";
import { TeamSizeFilter } from "./filters/TeamSizeFilter";
import { TeamBalanceFilter } from "./filters/TeamBalanceFilter";
import { RoleFilter } from "./filters/RoleFilter";
import { AbilityTypeFilter } from "./filters/AbilityTypeFilter";
import { useSelector } from "react-redux";
import { RootState } from "../stores";

export const FilterSidebar = () => {
  const results = useSelector((state: RootState) => state.randomizer.results);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={300}
      margin={5}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Typography variant="h5">Filters</Typography>
        <Typography>
          ({results} {results === 1 ? "result" : "results"})
        </Typography>
      </Box>
      <Divider />
      <TeamsFilter />
      <TeamSizeFilter />
      <TeamBalanceFilter />
      <RoleFilter />
      <AbilityTypeFilter />
    </Box>
  );
};
