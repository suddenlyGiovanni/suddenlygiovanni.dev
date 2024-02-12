/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    '@suddenly-giovanni/eslint-config/react.js',
    'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: true },
  plugins: ['react-refresh'],
  root: true,
  rules: {
    'import/no-default-export': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }],
  },
}
