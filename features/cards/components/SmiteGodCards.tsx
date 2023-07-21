import React, { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { SmiteGod } from "../../../api/smite/types";

export type SmiteGodCardsProps = {
  smiteGods: SmiteGod[];
};

const SmiteGodCard = styled(Card)`
  width: 300px;
  height: 400px;
  background-position-x: center;
  background-position-y: top;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SmiteGodCards: FC<SmiteGodCardsProps> = ({ smiteGods }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      marginTop={5}
      flexWrap="wrap"
      gap={5}
    >
      {smiteGods.map((god) => (
        <SmiteGodCard
          key={god.id}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${god.godCard_URL})`,
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" color="white">
              {god.Name}
            </Typography>
            <Typography color="white">{god.Pantheon}</Typography>
            <Typography color="white">{god.Title}</Typography>
          </CardContent>
        </SmiteGodCard>
      ))}
    </Box>
  );
};
