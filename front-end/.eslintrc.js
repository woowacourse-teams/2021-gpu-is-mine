module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["*.js", "storybook-static", "build"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.lint.json", "./cypress/tsconfig.json"],
  },
  plugins: [
    "react",
    "react-hooks",
    "import",
    "jsx-a11y",
    "@typescript-eslint",
    "jest",
    "jest-dom",
    "testing-library",
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  overrides: [
    {
      files: ["**/*.stories.tsx", "src/__test__/**/*"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: "./src/types/**/*.{ts,tsx}",
      rules: {
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: "**/*.styled.ts",
      rules: {
        "import/prefer-default-export": "off",
      },
    },
    {
      files: "**/*.tsx",
      rules: {
        "react/require-default-props": "off",
      },
    },
    {
      files: ["./src/**/*.tsx", "./src/**/*Slice.ts", "./src/**/use*.ts"],
      rules: {
        "@typescript-eslint/no-floating-promises": "off",
      },
    },
  ],
};
