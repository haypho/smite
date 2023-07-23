import { useMemo } from "react";
import { useGodsQuery } from "./api/smite/useGodsQuery";

export const useGodRoles = () => {
  const { data } = useGodsQuery();

  return useMemo(
    () =>
      data?.flatMap((god) => god.Roles.split(",").map((role) => role.trim())),
    [data],
  );
};
