import type { Config } from '@react-router/dev/config'

export default {
	appDirectory: 'app',
	serverModuleFormat: 'esm',
	buildDirectory: 'build',
	ssr: true,
	future: {
		unstable_optimizeDeps: true,
	},
} satisfies Config
