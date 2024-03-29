// @ts-check
// biome-ignore lint/nursery/noNodejsModules: this is fine in this context
const { resolve } = require('node:path')
const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: [
		'@vercel/style-guide/eslint/browser',
		'@vercel/style-guide/eslint/typescript',
		'@vercel/style-guide/eslint/react',
	].map(extendConfig => require.resolve(extendConfig)),
	parserOptions: {
		project,
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ['only-warn'],
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
		react: {
			version: 'detect',
		},
		linkComponents: [
			{ name: 'Link', linkAttribute: 'to' },
			{ name: 'NavLink', linkAttribute: 'to' },
		],
	},
	ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
	// add rules configurations here
	rules: {
		'import/no-default-export': 'off',
	},
}
