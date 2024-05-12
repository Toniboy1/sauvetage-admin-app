import { JestConfigWithTsJest } from "ts-jest/dist/types";
const config: JestConfigWithTsJest = {
  projects: [
    {
      displayName: "IDB jsdom",
      testMatch: ["<rootDir>/tests/backend/idb/*.test.ts"],
      testEnvironment: "jsdom",
      preset: "ts-jest",
      setupFiles: ["<rootDir>/jest.setup.ts"],
      globals: {
        "ts-jest": {
          tsconfig: "<rootDir>/tsconfig.json",
        },
      },
    },
    {
      displayName: "backend",
      testMatch: ["<rootDir>/tests/backend/*.test.ts"],
      testEnvironment: "node",
      preset: "ts-jest",
      setupFiles: ["<rootDir>/jest.setup.ts"],
      globals: {
        "ts-jest": {
          tsconfig: "<rootDir>/tsconfig.json",
        },
      },
    },
    {
      displayName: "pdf",
      testMatch: ["<rootDir>/tests/pdf/*.test.ts"],
      testEnvironment: "node",
      preset: "ts-jest",
      setupFiles: ["<rootDir>/jest.setup.ts"],
      globals: {
        "ts-jest": {
          tsconfig: "<rootDir>/tsconfig.json",
        },
      },
    },
  ],
  coverageReporters: ["json-summary"],
  collectCoverageFrom: [
    "./renderer/components/**/*.ts",
    "./renderer/model/**/*.ts",
  ],
};
export default config;
