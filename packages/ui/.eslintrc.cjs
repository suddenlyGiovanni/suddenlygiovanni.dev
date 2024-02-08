/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ['@suddenly-giovanni/eslint-config/react.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
}
