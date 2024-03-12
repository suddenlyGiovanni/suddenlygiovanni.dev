import mdx from '@mdx-js/rollup'
import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { codecovVitePlugin } from '@codecov/vite-plugin'

installGlobals()

/// <reference types="vitest" />
export default defineConfig({
	plugins: [
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
		}),
		remix({
			appDirectory: 'app',
			serverModuleFormat: 'esm',
			buildDirectory: 'build',
			ssr: true,
			future: {
				v3_throwAbortReason: true,
				v3_relativeSplatPath: true,
			},
		}),
		tsconfigPaths(),
		codecovVitePlugin({
			bundleName: 'web',
			enableBundleAnalysis: process.env['CODECOV_TOKEN'] !== undefined,
			uploadToken: process.env['CODECOV_TOKEN']!,
		}),
	],
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
