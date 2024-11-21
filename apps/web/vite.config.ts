import { codecovVitePlugin } from '@codecov/vite-plugin'
import { vitePlugin as remix } from '@remix-run/dev'
import { remixDevTools } from 'remix-development-tools'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

/// <reference types="vitest" />

export default defineConfig({
	plugins: [
		remixDevTools(),
		remix({
			appDirectory: 'app',
			serverModuleFormat: 'esm',
			buildDirectory: 'build',
			ssr: true,
			future: {
				v3_throwAbortReason: true,
				v3_relativeSplatPath: true,
				unstable_optimizeDeps: true,
				unstable_routeConfig: true,
			},
		}),
		tsconfigPaths(),
		codecovVitePlugin({
			bundleName: 'web',
			// biome-ignore lint/nursery/noProcessEnv: it is fine
			// biome-ignore lint/complexity/useLiteralKeys: TS4111: Property 'CODECOV_TOKEN' comes from an index signature, so it must be accessed with ['CODECOV_TOKEN'].
			enableBundleAnalysis: process.env['CODECOV_TOKEN'] !== undefined,
			// biome-ignore lint/nursery/noProcessEnv: it is fine
			// biome-ignore lint/style/noNonNullAssertion: it is fine to be undefined or sting
			// biome-ignore lint/complexity/useLiteralKeys: TS4111: Property 'CODECOV_TOKEN' comes from an index signature, so it must be accessed with ['CODECOV_TOKEN'].
			uploadToken: process.env['CODECOV_TOKEN']!,
		}),
	],
	test: {
		// biome-ignore lint/nursery/noProcessEnv: it is fine
		// biome-ignore lint/complexity/useLiteralKeys: TS4111: Property 'CODECOV_TOKEN' comes from an index signature, so it must be accessed with ['CODECOV_TOKEN'].
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		globalSetup: './app/tests/test-globals.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
