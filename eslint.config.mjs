import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone one-off Node scripts (not part of the Next.js app bundle).
    // Kept out of the app lint gate; they run under plain node, not the Next toolchain.
    "fix_images.js",
  ]),
]);

export default eslintConfig;
