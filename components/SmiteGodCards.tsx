import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../stores";

const SmiteGodCard = styled(Card)`
  width: 300px;
  height: 400px;
  background-position-x: center;
  background-position-y: top;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SmiteGodCards = () => {
  const randomGods = useSelector(
    (state: RootState) => state.randomizer.randomGods,
  );

  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      marginTop={5}
      flexWrap="wrap"
      gap={5}
      height="fit-content"
    >
      {randomGods.map((god) => (
        <SmiteGodCard
          key={god.id}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${god.godCard_URL})`,
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              color="white"
              fontWeight={700}
            >
              {god.Name}
            </Typography>
            <Typography color="white" fontWeight={700}>
              {god.Pantheon}
            </Typography>
            <Typography color="white" fontWeight={700}>
              {god.Title}
            </Typography>
          </CardContent>
        </SmiteGodCard>
      ))}
    </Box>
  );
};
