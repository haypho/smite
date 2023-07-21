import { Box, Button, Container, Slider, Typography } from "@mui/material";
import React, { FC } from "react";
import { AppDispatch } from "../../../stores/store";
import { useDispatch } from "react-redux";
import randomizerSlice from "../stores/randomizer.slice";

export const RandomizerControls: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginTop={4} gap={2}>
        <Slider
          marks={[
            { value: 1, label: "1" },
            { value: 3, label: "3" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
          ]}
          defaultValue={3}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(_, value: number | number[]) =>
            dispatch(
              randomizerSlice.actions.setCardCount(
                Array.isArray(value) ? value[0] : value,
              ),
            )
          }
        />
      </Box>
    </Container>
  );
};
