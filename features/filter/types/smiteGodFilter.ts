export enum SmiteFilterType {
  TEAMS = "Teams",
  TEAM_SIZE = "Team Size",
  ROLE = "Role",
}

export type SmiteFilter = (
  | {
    type: SmiteFilterType.TEAMS | SmiteFilterType.TEAM_SIZE;
    value: number;
  }
  | {
    type: SmiteFilterType.ROLE;
    value: string;
  }
) & {
  isUnique?: boolean;
};
