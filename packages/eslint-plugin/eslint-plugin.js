module.exports = {
  meta: {
    name: "@silenzio/eslint-plugin",
    version: "0.0.4",
  },
  configs: {
    recommended: {
      extends: [
        // "eslint:recommended",
        "airbnb-base",
        "plugin:prettier/recommended",
      ],
      ignorePatterns: [
        "node_modules",
        "dist",
        "coverage",
        "sanity-codegen.d.ts",
      ],
      plugins: ["prettier"],

      rules: {
        "prettier/prettier": "warn",
        "prefer-template": "error",
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
      },
      env: {
        browser: true,
        es2017: true,
        node: true,
      },
    },

    typescript: {
      parser: "@typescript-eslint/parser",

      plugins: ["@typescript-eslint"],

      extends: [
        "plugin:@silenzio/recommended",
        "plugin:@typescript-eslint/recommended",
      ],

      rules: {
        "@typescript-eslint/no-empty-function": "off",
        "import/extensions": "off",
      },
    },
  },
};
