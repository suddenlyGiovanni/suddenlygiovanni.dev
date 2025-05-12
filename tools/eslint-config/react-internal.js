import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
	...baseConfig,
	js.configs.recommended,
	eslintConfigPrettier,
	pluginReact.configs.flat.recommended,
	reactHooks.configs.recommended,
	{
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},
	{
		rules: {
			// React scope no longer necessary with new JSX transform.
			'react-hooks/react-compiler': 'error',
			'react/no-unescaped-entities': 'off',
			'react/react-in-jsx-scope': 'off',
		},
		settings: { react: { version: 'detect' } },
	},
]
