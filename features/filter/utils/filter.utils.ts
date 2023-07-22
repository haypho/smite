import { SmiteFilter, SmiteFilterType } from "../types/smiteGodFilter";

export const getSmiteTeamSizeFilters = (): SmiteFilter[] =>
  new Array(5).fill(0).map(
    (_, index): SmiteFilter => ({
      type: SmiteFilterType.TEAM_SIZE,
      value: index + 1,
      isUnique: true,
    }),
  );

export const getSmiteTeamCountFilters = (): SmiteFilter[] => [
  { type: SmiteFilterType.TEAMS, value: 1, isUnique: true },
  { type: SmiteFilterType.TEAMS, value: 2, isUnique: true },
];

export const getSmiteRoleFilters = (): SmiteFilter[] => [
  { type: SmiteFilterType.ROLE, value: "Assassin" },
  { type: SmiteFilterType.ROLE, value: "Mage" },
  { type: SmiteFilterType.ROLE, value: "Hunter" },
  { type: SmiteFilterType.ROLE, value: "Guardian" },
  { type: SmiteFilterType.ROLE, value: "Warrior" },
];

export const getFilterOptions = (): SmiteFilter[] => [
  ...getSmiteTeamSizeFilters(),
  ...getSmiteTeamCountFilters(),
  ...getSmiteRoleFilters(),
];
