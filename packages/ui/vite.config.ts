import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	resolve: {
		alias: {
			'@fonts': resolve('../../apps/web/public/fonts'),
		},
	},
	build: { target: 'esnext' },
	plugins: [react(), tailwindcss(), tsconfigPaths()],
})
