import { config } from '@suddenly-giovanni/eslint-config/react-internal'
import vitest from '@vitest/eslint-plugin'

/** @type {import("eslint").Linter.Config} */

export default [
	...config,
	{
		files: ['**/*.{spec,test}.{ts,tsx}'],
		...vitest.configs.all,
	},
]
