import type { Config } from '@react-router/dev/config'

export default {
	appDirectory: 'src',
	buildDirectory: 'build',
	future: {
		unstable_splitRouteModules: true,
	},
	serverBuildFile: 'index.js',
	serverModuleFormat: 'esm',
	ssr: true,
} satisfies Config
