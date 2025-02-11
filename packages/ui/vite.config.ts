import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ReactCompilerConfig = {
	/* ... */
}

export default defineConfig({
	resolve: {
		alias: {
			'@fonts': resolve('../app/public/fonts'),
		},
	},
	build: { target: 'esnext' },
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
			},
		}),
		tailwindcss(),
	],
})
