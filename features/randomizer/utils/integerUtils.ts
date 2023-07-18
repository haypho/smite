export const getRandomIntWithInclusiveRange = (
  range: [number, number],
): number => {
  const min = Math.ceil(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mapToUniqueIntWithInclusiveRange =
  (range: [number, number], previousValues = new Set<number>()) =>
    () => {
      let index: number;
      do {
        index = getRandomIntWithInclusiveRange(range);
      } while (previousValues.has(index));
      previousValues.add(index);
      return index;
    };
