import type { Config } from '@react-router/dev/config'

export default {
	appDirectory: 'app',
	serverModuleFormat: 'esm',
	buildDirectory: 'build',
	prerender: ['/', '/reading-journal', '/second-brain', '/motivations'],
	ssr: true,
	future: {
		unstable_optimizeDeps: true,
	},
} satisfies Config
