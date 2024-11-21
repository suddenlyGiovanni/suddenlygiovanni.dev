import { type RouteConfig, index, route } from '@remix-run/route-config'

export const routes = [
	index('routes/_index.tsx'),
	route('/motivations', 'routes/motivations/route.tsx'),
	route('/brain-dump', 'routes/brain-dump/route.tsx'),
	route('/reading-journal', 'routes/reading-journal/route.tsx'),
	route('/resume', 'routes/resume/route.tsx'),
	route('/resources/healthcheck', 'routes/resources.healthcheck.tsx'),
] satisfies RouteConfig
