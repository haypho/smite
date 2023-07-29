import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Fab,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { FilterAlt } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch, filtersSlice } from "../stores";
import { useGodRandomizer } from "../hooks/useGodRandomizer";
import { FilterSidebar } from "./FilterSidebar";
import { SmiteGodCards } from "./SmiteGodCards";
import { FilterDrawer } from "./FilterDrawer";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FilterFab = styled(Fab)`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1em;
`;

export const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const randomize = useGodRandomizer();
  return (
    <MainContainer>
      <AppBar position="sticky">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h5">
              Smite Randomizer
            </Typography>
            <Button color="inherit" variant="outlined" onClick={randomize}>
              Shuffle
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box display="flex" flex={1}>
        {!isSmallScreen && <FilterSidebar />}
        <SmiteGodCards />
      </Box>
      {isSmallScreen && (
        <>
          <FilterFab
            color="primary"
            onClick={() => dispatch(filtersSlice.actions.showDrawer())}
          >
            <FilterAlt />
          </FilterFab>
          <FilterDrawer />
        </>
      )}
    </MainContainer>
  );
};
