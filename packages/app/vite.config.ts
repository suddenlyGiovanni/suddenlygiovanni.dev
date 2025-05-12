import { exec } from 'node:child_process'
import process from 'node:process'

import { codecovVitePlugin } from '@codecov/vite-plugin'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouterDevTools } from 'react-router-devtools'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import tsconfigPaths from 'vite-tsconfig-paths'

const ReactCompilerConfig = {
	/* ... */
}

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		externalImportAttributes: true,
		/** Disable minification for better debugging */
		minify: false,

		rollupOptions: isSsrBuild ? { input: './src/server/handler/handler.ts' } : {},

		/** Enable source maps for better debugging experience */
		sourcemap: true,

		/** Target the latest ECMAScript features for better performance */
		target: 'esnext',
	},

	optimizeDeps: {
		exclude: ['src/server/'],
	},
	plugins: [
		{
			enforce: 'pre',
			...mdx({
				/* jsxImportSource: …, otherOptions… */
			}),
		},
		babel({
			babelConfig: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]], // if you use TypeScript
				presets: ['@babel/preset-typescript'],
			},
			filter(name: string): boolean {
				return name.endsWith('.tsx')
			},
			include: ['./src/**/*', '../ui/src/**/*'],
		}),
		reactRouterDevTools({
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
			server: {
				logs: {
					actions: true,
					cache: true,
					cookies: true,
					defer: true,
					loaders: true,
					serverTimings: true,
					siteClear: true,
				},
				silent: false,
			},
		}),
		reactRouter(),
		tailwindcss(),
		tsconfigPaths(),
		codecovVitePlugin({
			bundleName: 'web',
			enableBundleAnalysis: process.env['CODECOV_TOKEN'] !== undefined,
			uploadToken: process.env['CODECOV_TOKEN']!,
		}),
	],
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
		globalSetup: './src/tests/test-globals.ts',
		includeSource: ['./src/**/*.{ts,tsx}', './src/server/**/*.ts', './types/**/*.ts'],
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
	},
}))
