/** @jest-config-loader ts-node */

import type { Config } from "jest";
import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset({
  //...options
});

export default {
  ...presetConfig,
  resolver: "<rootDir>/custom-resolver.ts",
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.spec.json"
    }
  }
} satisfies Config;
