import process from 'node:process'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouterHonoServer } from 'react-router-hono-server/dev'
import tsconfigPaths from 'vite-tsconfig-paths'

/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
	publicDir: 'public',
	cacheDir: 'node_modules/.vite',
	root: process.cwd(),
	plugins: [
		{ enforce: 'pre', ...mdx({}) },
		reactRouterHonoServer({
			runtime: 'node',
			serverEntryPoint: 'server/index.ts',
		}),
		reactRouter(),
		tailwindcss(),
		tsconfigPaths(),
	],
	test: {
		includeSource: ['./client/**/*.{ts,tsx}', './server/**/*.ts', './types/**/*.ts'], // biome-ignore lint/complexity/useLiteralKeys: TS4111: Property 'CODECOV_TOKEN' comes from an index signature, so it must be accessed with ['CODECOV_TOKEN'].
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		globalSetup: './client/tests/test-globals.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
