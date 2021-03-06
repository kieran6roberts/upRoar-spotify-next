module.exports = {
  clearMocks: true,
  coverageDirectory: "<rootDir>/src/.coverage",
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/src/components/$1",
    "^@/containers(.*)$": "<rootDir>/src/containers/$1",
    "^@/context(.*)$": "<rootDir>/src/context/$1",
    "^@/hooks(.*)$": "<rootDir>/src/hooks/$1",
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/testMockData(.*)$": "<rootDir>/src/testMockData/$1",
    "^@/utility(.*)$": "<rootDir>/src/utility/$1",
    "^@/validation(.*)$": "<rootDir>/src/validation/$1"
  },
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/backend/"
  ],
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest"
  }
};
