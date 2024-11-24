import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
	index('routes/about-me.tsx'),
	route('/motivations', 'routes/motivations.tsx'),
	route('/second-brain', 'routes/second-brain.tsx'),
	route('/reading-journal', 'routes/reading-journal.tsx'),
	route('/resume', 'routes/resume/resume.tsx'),
	...prefix('/resources', [
		//
		route('/healthcheck', 'routes/resources/healthcheck.tsx'),
	]),
] satisfies RouteConfig
