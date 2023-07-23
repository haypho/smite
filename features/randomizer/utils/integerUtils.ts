export const getRandomIntWithInclusiveRange = (
  range: [number, number],
): number => {
  const min = Math.ceil(range[0]);
  const max = Math.floor(range[1]);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
