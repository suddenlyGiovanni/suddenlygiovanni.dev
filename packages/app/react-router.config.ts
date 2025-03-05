import type {
	Config,
} from '@react-router/dev/config'

export default {
	appDirectory: 'client',
	serverModuleFormat: 'esm',
	serverBuildFile: 'index.js',
	buildDirectory: 'build',
	ssr: true,
	future: {
		unstable_splitRouteModules: true,
	},
	prerender: [
		'/',
		'/motivations',
	],
} satisfies Config
