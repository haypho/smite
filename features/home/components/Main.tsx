import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
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
            <Typography>Smite Randomizer</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <RandomizerControls onRandomize={randomize} />
        <SmiteGodCards smiteGods={smiteGods} />
      </Container>
    </MainContainer>
  );
};
