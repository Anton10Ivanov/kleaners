
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
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
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
      
      // Strict TypeScript rules
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
      "@typescript-eslint/explicit-function-return-type": ["error", {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true,
        "allowHigherOrderFunctions": true
      }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-ignore": "allow-with-description",
        "ts-expect-error": "allow-with-description"
      }],
      
      // Naming conventions
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "enumMember",
          "format": ["PascalCase"]
        },
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        }
      ],
      
      // React specific rules
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      
      // General code quality
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error"
    },
  }
);
