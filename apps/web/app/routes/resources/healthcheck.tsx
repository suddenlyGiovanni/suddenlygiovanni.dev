import type { Route } from './+types/healthcheck'

export function loader(_: Route.LoaderArgs): Response {
	return new Response('OK', {
		status: 200,
		statusText: 'OK',
	})
}
