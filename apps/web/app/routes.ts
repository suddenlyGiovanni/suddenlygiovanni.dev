import { type RouteConfig, index, prefix, route } from '@remix-run/route-config'

export const routes = [
	index('routes/about-me.tsx'),
	route('/motivations', 'routes/motivations.tsx'),
	route('/second-brain', 'routes/second-brain.tsx'),
	route('/reading-journal', 'routes/reading-journal.tsx'),
	route('/resume', 'routes/resume/route.tsx'),
	...prefix('/resources', [
		//
		route('/healthcheck', 'routes/resources.healthcheck.tsx'),
	]),
] satisfies RouteConfig
