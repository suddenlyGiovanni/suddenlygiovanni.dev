import type { Config } from '@react-router/dev/config'

export default {
	appDirectory: 'src',
	serverModuleFormat: 'esm',
	serverBuildFile: 'index.js',
	buildDirectory: 'build',
	ssr: true,
	future: {
		unstable_optimizeDeps: true,
	},
} satisfies Config
