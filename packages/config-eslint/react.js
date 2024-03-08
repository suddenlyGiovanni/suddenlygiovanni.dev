// @ts-check
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

module.exports = {
	extends: [
		'@vercel/style-guide/eslint/browser',
		'@vercel/style-guide/eslint/typescript',
		'@vercel/style-guide/eslint/react',
	].map(eslintConfig => require.resolve(eslintConfig)),
	parserOptions: { project },
	globals: { JSX: true },
	plugins: ['only-warn'],
	// settings: { "import/resolver": { project } },
	ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
	// add rules configurations here
	rules: {},
	// I need to disable a bunch of rules in the context of `*.stories.tsx` files
	overrides: [
		{
			files: ['**/*.stories.tsx'],
			extends: ['plugin:storybook/recommended', 'plugin:storybook/csf-strict'],
			rules: {
				// add more rules to disable here
				'react/function-component-definition': 'off',
			},
		},
	],
}
