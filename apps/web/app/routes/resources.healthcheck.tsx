import type { LoaderFunctionArgs } from '@remix-run/node'

export async function loader(_: LoaderFunctionArgs): Promise<Response> {
	return new Response('OK', {
		status: 200,
		statusText: 'OK',
	})
}
