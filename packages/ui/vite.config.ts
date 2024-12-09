import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const ReactCompilerConfig = {
	/* ... */
}

export default defineConfig({
	resolve: {
		alias: {
			'@fonts': resolve('../../apps/web/public/fonts'),
		},
	},
	build: { target: 'esnext' },
	plugins: [
		tsconfigPaths(),
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
			},
		}),
		tailwindcss(),
	],
})
