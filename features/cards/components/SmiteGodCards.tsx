import React, { FC } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SmiteGod } from "../../../api/smite/types";

export type SmiteGodCardsProps = {
  smiteGods: SmiteGod[];
};

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
        <Card
          key={god.id}
          sx={{
            width: 300,
            height: 400,
            backgroundImage: `URL(${god.godCard_URL})`,
            backgroundPositionX: "center",
            backgroundPositionY: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4">
              {god.Name}
            </Typography>
            <Typography>{god.Pantheon}</Typography>
            <Typography>{god.Title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
