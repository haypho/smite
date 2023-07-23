import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { TeamsFilter } from "./filters/TeamsFilter";
import { TeamSizeFilter } from "./filters/TeamSizeFilter";
import { TeamBalanceFilter } from "./filters/TeamBalanceFilter";
import { RoleFilter } from "./filters/RoleFilter";
import { AbilityTypeFilter } from "./filters/AbilityTypeFilter";

export const FilterSidebar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      minWidth={300}
      margin={5}
    >
      <Typography variant="h5">Filters</Typography>
      <Divider />
      <TeamsFilter />
      <TeamSizeFilter />
      <TeamBalanceFilter />
      <RoleFilter />
      <AbilityTypeFilter />
    </Box>
  );
};
