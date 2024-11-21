import { type RouteConfig, index, prefix, route } from '@remix-run/route-config'

export const routes = [
	index('routes/about-me.tsx'),
	route('/motivations', 'routes/motivations/route.tsx'),
	route('/brain-dump', 'routes/brain-dump/route.tsx'),
	route('/reading-journal', 'routes/reading-journal/route.tsx'),
	route('/resume', 'routes/resume/route.tsx'),
	...prefix('/resources', [
		//
		route('/healthcheck', 'routes/resources.healthcheck.tsx'),
	]),
] satisfies RouteConfig
