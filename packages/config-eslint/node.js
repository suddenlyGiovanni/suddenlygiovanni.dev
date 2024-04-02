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
		'@vercel/style-guide/eslint/node',
		'@vercel/style-guide/eslint/typescript',
		'@vercel/style-guide/eslint/vitest',
	].map(extendConfig => require.resolve(extendConfig)),
	parserOptions: {
		project,
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: { node: true },
	plugins: ['only-warn'],
	settings: {
		'import/resolver': {
			typescript: { project },
		},
	},
	ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
	// add rules configurations here
}
