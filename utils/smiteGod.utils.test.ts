import { SmiteGod } from "../api/smite/types";
import * as SmiteGodUtils from "./smiteGod.utils";
import { faker } from "@faker-js/faker";

describe("SmiteGodUtils", () => {
  const smiteGodWithAbilities: Pick<SmiteGod, SmiteGodUtils.AbilityTypes> = {
    Ability_1: {
      Description: {
        itemDescription: {
          cooldown: "10s",
          cost: "5/10/15/20/25",
          description: "",
          menuitems: [{ description: "Ability Type:", value: "Area" }],
          rankitems: [],
        },
      },
      Id: 0,
      Summary: "",
      URL: "",
    },
    Ability_2: {
      Description: {
        itemDescription: {
          cooldown: "10s",
          cost: "5/10/15/20/25",
          description: "",
          menuitems: [{ description: "Ability Type:", value: "Pet" }],
          rankitems: [],
        },
      },
      Id: 0,
      Summary: "",
      URL: "",
    },
    Ability_3: {
      Description: {
        itemDescription: {
          cooldown: "10s",
          cost: "5/10/15/20/25",
          description: "",
          menuitems: [{ description: "Ability Type:", value: "Root" }],
          rankitems: [],
        },
      },
      Id: 0,
      Summary: "",
      URL: "",
    },
    Ability_4: {
      Description: {
        itemDescription: {
          cooldown: "10s",
          cost: "5/10/15/20/25",
          description: "",
          menuitems: [
            { description: "Ability Type:", value: "Wall,  Stun" },
            { description: "Type:", value: "Magical" },
          ],
          rankitems: [],
        },
      },
      Id: 0,
      Summary: "",
      URL: "",
    },
    Ability_5: {
      Description: {
        itemDescription: {
          cooldown: "10s",
          cost: "5/10/15/20/25",
          description: "",
          menuitems: [{ description: "Ability Type:", value: "Tremble" }],
          rankitems: [],
        },
      },
      Id: 0,
      Summary: "",
      URL: "",
    },
  };

  describe("#mapGodsToRoles", () => {
    it("should return an empty array by default", () => {
      const roles = SmiteGodUtils.mapGodsToRoles([]);

      expect(roles).toStrictEqual([]);
    });

    it("should return unique roles for the entire list", () => {
      const expectedRoles = new Array(5).fill("").map(() => faker.word.noun());
      const smiteGods: Array<Pick<SmiteGod, "Roles">> = [
        { Roles: expectedRoles.join(" ,  ") },
        { Roles: expectedRoles.concat(expectedRoles).join(",") },
        { Roles: expectedRoles.join("     ,") },
      ];

      const roles = SmiteGodUtils.mapGodsToRoles(smiteGods);

      expect(roles).toStrictEqual(expectedRoles);
    });
  });

  describe("#filterByRole", () => {
    it("should default to include when role filter is empty", () => {
      const role = "";
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: faker.word.noun(),
      };

      const isIncluded = SmiteGodUtils.filterByRole(role)(smiteGod);

      expect(isIncluded).toBe(true);
    });

    it("should include smite smiteGod when roles match", () => {
      const role = faker.word.noun();
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: role,
      };

      const isIncluded = SmiteGodUtils.filterByRole(role)(smiteGod);

      expect(isIncluded).toBe(true);
    });

    it("should not include smite smiteGod when role is missing", () => {
      const role = faker.word.noun();
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: faker.word.noun(),
      };

      const isIncluded = SmiteGodUtils.filterByRole(role)(smiteGod);

      expect(isIncluded).toBe(false);
    });
  });

  describe("#filterByRoles", () => {
    it("should include smite god by default when roles filter is empty", () => {
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: faker.word.noun(),
      };

      const isIncluded = SmiteGodUtils.filterByRoles([])(smiteGod);

      expect(isIncluded).toBe(true);
    });

    it("should include smite god when one role is matching", () => {
      const roles = new Array(5).fill("").map(() => faker.word.noun());
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: new Array(2)
          .fill("")
          .map(() => faker.word.noun())
          .concat(roles[0])
          .join(","),
      };

      const isIncluded = SmiteGodUtils.filterByRoles(roles)(smiteGod);

      expect(isIncluded).toBe(true);
    });

    it("should not include smite god when no roles match", () => {
      const roles = new Array(5).fill("").map(() => faker.word.noun());
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: new Array(5)
          .fill("")
          .map(() => faker.word.noun())
          .join(","),
      };

      const isIncluded = SmiteGodUtils.filterByRoles(roles)(smiteGod);

      expect(isIncluded).toBe(false);
    });
  });

  describe("#mapsmiteGodToRoles", () => {
    it("should return empty array when smite smiteGod is missing", () => {
      const roles = SmiteGodUtils.mapGodToRoles(undefined);

      expect(roles).toStrictEqual([]);
    });
    it("should split and trim roles when parsing from smite smiteGod", () => {
      const expectedRoles = new Array(5).fill("").map(() => faker.word.noun());
      const smiteGod: Pick<SmiteGod, "Roles"> = {
        Roles: expectedRoles.join("     ,     "),
      };

      const roles = SmiteGodUtils.mapGodToRoles(smiteGod);

      expect(roles).toStrictEqual(expectedRoles);
    });
  });

  describe("#mapGodToAbilityTypes", () => {
    it("should map all abilities for smite god", () => {
      const abilityTypes = SmiteGodUtils.mapGodToAbilityTypes(
        smiteGodWithAbilities,
      );

      expect(abilityTypes).toStrictEqual([
        "Area",
        "Pet",
        "Root",
        "Wall",
        "Stun",
        "Tremble",
      ]);
    });
  });

  describe("#filterByAbilityTypes", () => {
    it("should include smite god by default when missing ability types", () => {
      const isIncluded = SmiteGodUtils.filterByAbilityTypes([])(
        smiteGodWithAbilities,
      );

      expect(isIncluded).toBe(true);
    });

    it("should include smite god when ability type is matching", () => {
      const isIncluded = SmiteGodUtils.filterByAbilityTypes(["Root"])(
        smiteGodWithAbilities,
      );

      expect(isIncluded).toBe(true);
    });

    it("should not include smite god when no ability types match", () => {
      const isIncluded = SmiteGodUtils.filterByAbilityTypes(["Heal"])(
        smiteGodWithAbilities,
      );

      expect(isIncluded).toBe(false);
    });
  });

  describe("#mapRolesToRoleCounts", () => {
    const roles = new Array(5).fill("").map(() => faker.word.noun());
    const expectedRoleCounts = roles.map((role) => ({ role, count: 2 }));

    const roleCounts = SmiteGodUtils.mapRolesToRoleCounts([...roles, ...roles]);

    expect(roleCounts).toStrictEqual(expectedRoleCounts);
  });
});
