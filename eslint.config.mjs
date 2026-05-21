import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 🚫 BLOCK STATIC INLINE STYLES RULE
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Selector target: A JSX 'style' attribute whose value is a pure object literal containing properties
          "selector": "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
          "message": "❌ PR REJECTED: Hardcoded static inline styles are banned. Please move static styles to a layout/page .module.css file. Inline styles are only permitted if they use dynamic React state or runtime variables."
        }
      ]
    }
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;