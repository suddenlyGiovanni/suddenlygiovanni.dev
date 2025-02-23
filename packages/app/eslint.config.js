import { config } from '@repo/eslint-config/react-internal'
import vitest from '@vitest/eslint-plugin'

/** @type {import("eslint").Linter.Config[]} */
export default [
	...config,
	{
		files: ['**/*.{spec,test}.{ts,tsx}'],
		...vitest.configs.all,
		rules: {
			...vitest.configs.all.rules,
			'no-console': 'off',
			'vitest/no-hooks': 'off',
		},
	},
]
