import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = defineConfig([
	baseConfig,
	{
		files: ['**/*.tsx'],
		extends: [
			reactPlugin.configs.flat.recommended,
			reactPlugin.configs.flat['jsx-runtime'],
			reactHooks.configs.recommended,
			eslintConfigPrettier,
		],
		languageOptions: {
			...reactPlugin.configs.flat.recommended.languageOptions,
		},
	},
])
