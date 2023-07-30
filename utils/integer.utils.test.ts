import * as IntegerUtils from "./integer.utils";

describe("IntegerUtils", () => {
  describe("#getRandomIntWithInclusiveRange", () => {
    [
      [-1, 0],
      [0, 1.111],
      [1, 1],
      [0, 10],
    ].forEach(([min, max]) => {
      it(`should return integer in range [${min}, ${max}]`, () => {
        const int = IntegerUtils.getRandomIntWithInclusiveRange([min, max]);

        expect(int).toBeGreaterThanOrEqual(min);
        expect(int).toBeLessThanOrEqual(max);
      });
    });
  });
});
