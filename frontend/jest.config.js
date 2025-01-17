export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^.+\\.(css|scss|svg|png|jpg|jpeg)$": "identity-obj-proxy",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.app.json",
      useESM: true,
    },
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ['ts-jest', { useESM: true }],
    // process `*.tsx` files with `ts-jest`
  },
};
