/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ['@suddenly-giovanni/eslint-config/react.js', 'plugin:storybook/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
	rules: {
		'import/no-default-export': 'off',
	},
}
