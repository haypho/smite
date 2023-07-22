import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { FC } from "react";
import styled from "@emotion/styled";
import { SmiteGodCards } from "../../cards";
import { FilterAutocomplete } from "../../filter";
import { useGodRandomizer } from "../../randomizer";

const MainContainer = styled.main`
  flex: 1;
`;

export const Main: FC = () => {
  const randomize = useGodRandomizer();
  return (
    <MainContainer>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>Smite Randomizer</Typography>
            <Button color="inherit" variant="outlined" onClick={randomize}>
              Shuffle
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <FilterAutocomplete />
        <SmiteGodCards />
      </Container>
    </MainContainer>
  );
};
