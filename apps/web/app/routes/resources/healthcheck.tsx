import type { LoaderFunctionArgs } from '@remix-run/node'

export function loader(_: LoaderFunctionArgs): Response {
	return new Response('OK', {
		status: 200,
		statusText: 'OK',
	})
}
