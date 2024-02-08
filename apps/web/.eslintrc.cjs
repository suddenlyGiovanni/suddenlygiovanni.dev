/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@suddenly-giovanni/eslint-config/remix.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
