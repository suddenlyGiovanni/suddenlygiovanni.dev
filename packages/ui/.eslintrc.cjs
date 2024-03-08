/** @type {import('eslint').Linter.Config} */
module.exports = {
	env: { browser: true, es2020: true },
	extends: ['@suddenly-giovanni/eslint-config/react.js'],
	plugins: ['react-refresh'],
	rules: {
		'import/no-default-export': 'off',
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
}
