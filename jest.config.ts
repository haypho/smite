import createNextJest from "next/jest";

const createJestConfig = createNextJest({ dir: "./" });

export default createJestConfig({
  clearMocks: true,
  collectCoverageFrom: [
    "api/**/*",
    "components/**/*",
    "hooks/**/*",
    "pages/**/*",
    "stores/**/*",
    "styles/**/*",
    "types/**/*",
    "utils/**/*",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\", "index.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
  testRegex: ["\\.test\\.tsx?$"],
});
