module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        jsxSingleQuote: false,
        singleQuote: false,
        tabWidth: 2,
        endOfLine: "auto",
      },
    ],
  },
};
