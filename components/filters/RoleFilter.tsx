import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { AppDispatch, RootState, filtersSlice } from "../../stores";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "../../types/filterTypes";

export const RoleFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentRoles = useSelector((state: RootState) => state.filters.roles);

  const updateRole = (role: Role) => (_: ChangeEvent, checked: boolean) => {
    const action = filtersSlice.actions[checked ? "addRole" : "removeRole"];
    dispatch(action(role));
  };

  return (
    <FormControl>
      <FormLabel id="filters-role">Roles</FormLabel>
      <FormGroup>
        {[
          Role.ASSASSIN,
          Role.GUARDIAN,
          Role.HUNTER,
          Role.MAGE,
          Role.WARRIOR,
        ].map((role) => (
          <FormControlLabel
            key={role}
            control={
              <Checkbox
                checked={currentRoles.includes(role)}
                onChange={updateRole(role)}
              />
            }
            label={role}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
