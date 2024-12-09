import { exec } from 'node:child_process'
import process from 'node:process'
import { codecovVitePlugin } from '@codecov/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouterDevTools } from 'react-router-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'

/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		reactRouterDevTools({
			server: {
				silent: false,
				logs: {
					/**
					 * Whether to log cookie headers in the console
					 * @default true
					 */
					cookies: true,
					/**
					 * Whether to log deferred loaders  in the console
					 * @default true
					 */
					defer: true,
					/**
					 * Whether to log action calls in the console
					 * @default true
					 * */
					actions: true,
					/**
					 * Whether to log loader calls in the console
					 * @default true
					 */
					loaders: true,
					/**
					 * Whether to log cache headers in the console
					 * @default true
					 */
					cache: true,
					/**
					 * Whether to log site clear headers in the console
					 * @default true
					 */
					siteClear: true,
					/**
					 * Whether to log server timings headers in the console
					 * @default true
					 */
					serverTimings: true,
				},
			},
			editor: {
				name: 'WebStorm',
				open(path, lineNumber): void {
					exec(
						`webstorm "${process.cwd()}/${path}" --line ${lineNumber ? `--line ${lineNumber}` : ''}`.replace(
							/\$/g,
							'\\$',
						),
					)
				},
			},
		}),
		reactRouter(),
		tailwindcss(),
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
		// biome-ignore lint/complexity/useLiteralKeys: TS4111: Property 'CODECOV_TOKEN' comes from an index signature, so it must be accessed with ['CODECOV_TOKEN'].
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		globalSetup: './app/tests/test-globals.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
