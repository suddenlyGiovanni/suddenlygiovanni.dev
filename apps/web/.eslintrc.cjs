/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ['@suddenlygiovanni/eslint-config/remix.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
}
