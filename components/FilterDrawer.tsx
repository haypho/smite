import {
  AppBar,
  Box,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, filtersSlice } from "../stores";
import { Close } from "@mui/icons-material";
import { TeamsFilter } from "./filters/TeamsFilter";
import { TeamSizeFilter } from "./filters/TeamSizeFilter";
import { RoleFilter } from "./filters/RoleFilter";
import { TeamBalanceFilter } from "./filters/TeamBalanceFilter";
import { AbilityTypeFilter } from "./filters/AbilityTypeFilter";

export const FilterDrawer = () => {
  const dispatch: AppDispatch = useDispatch();
  const results = useSelector((state: RootState) => state.randomizer.results);
  const isDrawerOpen = useSelector(
    (state: RootState) => state.filters.isDrawerOpen,
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isDrawerOpen}
      onClose={() => dispatch(filtersSlice.actions.hideDrawer())}
      onOpen={() => dispatch(filtersSlice.actions.showDrawer())}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Filters&nbsp;({results} {results === 1 ? "result" : "results"})
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => dispatch(filtersSlice.actions.hideDrawer())}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        gap={2}
        padding={2}
        marginX={2}
      >
        <TeamsFilter />
        <TeamSizeFilter />
        <TeamBalanceFilter />
        <RoleFilter />
        <AbilityTypeFilter />
      </Box>
    </SwipeableDrawer>
  );
};
