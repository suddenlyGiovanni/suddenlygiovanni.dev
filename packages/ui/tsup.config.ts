import { defineConfig } from 'tsup'

export default defineConfig(options => ({
	treeshake: true,
	entry: ['src/**/*.tsx'],
	splitting: true,
	sourcemap: true,
	clean: true,
	format: ['esm'],
	dts: true,
	minify: false,
	external: ['react'],
	...options,
}))
