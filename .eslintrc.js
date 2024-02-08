module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "class-methods-use-this": "off",
    "no-restricted-syntax": "off",
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        trailingComma: "all",
        bracketSpacing: true,
        printWidth: 100,
        endOfLine: "lf",
        tabWidth: 2,
      },
    ],
    "import/order": [
      2,
      {
        groups: ["external", "builtin", "index", "sibling", "internal", "type"],
        pathGroups: [
          {
            pattern: "(components|screens|ui|config)*",
            group: "internal",
          },
          {
            pattern: "./*.+(css|sass|less|scss|pcss|styl)",
            group: "internal",
            position: "after",
          },
          {
            pattern: "./*.+(props)",
            group: "type",
          },
          {
            pattern: "types*",
            group: "type",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
};
