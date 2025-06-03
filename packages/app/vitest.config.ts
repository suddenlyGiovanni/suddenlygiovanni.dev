import process                       from 'node:process'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig                    from './vite.config'
import { codecovVitePlugin } from '@codecov/vite-plugin'

export default defineConfig(configEnv => mergeConfig(
		viteConfig(configEnv),
		defineConfig({
			plugins: [
				codecovVitePlugin({
					bundleName: 'web',
					enableBundleAnalysis: process.env['CODECOV_TOKEN'] !== undefined,
					uploadToken: process.env['CODECOV_TOKEN']!,
				})
			],
			test: {
				globalSetup: './src/tests/test-globals.ts',
				includeSource: ['./src/**/*.{ts,tsx}', './src/server/**/*.ts', './types/**/*.ts'],
				coverage: {
					provider: 'v8',
					experimentalAstAwareRemapping: true,
					reporter: ['text', 'json', 'html'],
				},
				reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
			},
		})
))
