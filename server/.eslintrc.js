module.exports = {
  extends: ["plugin:prettier/recommended"],
  env: {
    node: true,
    es2021: true,
  },
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
