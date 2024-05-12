import { JestConfigWithTsJest } from "ts-jest/dist/types";
const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageReporters: ["json-summary"],
  collectCoverageFrom: [
    './renderer/components/**/*.ts',
    './renderer/model/**/*.ts',
  ],
  setupFiles: ["<rootDir>/jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};
export default config;
