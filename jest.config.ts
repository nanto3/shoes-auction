import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  "verbose": true,
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx)",
    "**/?(*.)+(spec|test).+(ts|tsx)",
  ],
  "transform": { "^.+\\.(ts|tsx)$": "ts-jest" },
};

export default config;
