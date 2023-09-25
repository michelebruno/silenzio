module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
  ignorePatterns: ["node_modules", "dist"],
  rules: {
    "prefer-template": "error",
  },
};
