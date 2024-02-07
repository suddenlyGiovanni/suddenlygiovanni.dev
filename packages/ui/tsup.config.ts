import { defineConfig } from 'tsup'

// biome-ignore lint/style/noDefaultExport: ok in this case
export default defineConfig({
	entry: ['src/index.tsx'],
	splitting: true,
	sourcemap: true,
	clean: true,
	format: 'esm',
	dts: true,
	external: ['react', 'react-dom'],
})
