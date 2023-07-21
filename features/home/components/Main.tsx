import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { FC } from "react";
import { RandomizerControls } from "../../randomizer";
import styled from "@emotion/styled";
import { SmiteGodCards } from "../../cards";
import { useRandomGods } from "../../randomizer/hooks/useRandomGods";

const MainContainer = styled.main`
  flex: 1;
`;

export const Main: FC = () => {
  const { smiteGods, randomize } = useRandomGods();
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
        <RandomizerControls />
        <SmiteGodCards smiteGods={smiteGods} />
      </Container>
    </MainContainer>
  );
};
