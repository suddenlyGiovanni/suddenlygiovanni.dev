import pluginReact from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{ts,tsx}'] },
	{ languageOptions: { globals: globals.browser } },
	tseslint.configs.base,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	{
		plugins: {
			'react-compiler': reactCompiler,
		},
		rules: {
			'react-compiler/react-compiler': 'error',
		},
	},
]
