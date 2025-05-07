import { config } from '@repo/eslint-config/react-internal'
import vitest from '@vitest/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
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
])
