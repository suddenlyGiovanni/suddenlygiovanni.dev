import { index, prefix, type RouteConfig, route } from '@react-router/dev/routes'

export default [
	index('routes/about-me.tsx'),
	route('/motivations', 'routes/motivations.tsx'),
	route('/second-brain', 'routes/second-brain.tsx'),
	route('/reading-journal', 'routes/reading-journal.tsx'),
	route('/resume', 'routes/resume/resume.tsx'),
	route('/teams/:teamId', 'routes/teams/team.tsx'),
	...prefix('/resources', [
		//
		route('/theme-switch', 'routes/resources/theme-switch.tsx'),
		route('/healthcheck', 'routes/resources/healthcheck.tsx'),
	]),
] satisfies RouteConfig
