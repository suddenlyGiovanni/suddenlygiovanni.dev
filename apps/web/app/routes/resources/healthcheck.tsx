import type { LoaderFunctionArgs } from 'react-router'

export function loader(_: LoaderFunctionArgs): Response {
	return new Response('OK', {
		status: 200,
		statusText: 'OK',
	})
}
