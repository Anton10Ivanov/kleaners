
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.strict],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/consistent-type-imports": ["error", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": true,
        "fixStyle": "separate-type-imports"
      }],
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-ignore": "allow-with-description",
        "ts-expect-error": "allow-with-description"
      }],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "enumMember",
          "format": ["PascalCase"]
        }
      ]
    },
  }
);
