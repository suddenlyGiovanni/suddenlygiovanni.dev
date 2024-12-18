import { http, type HttpHandler } from 'msw'

export const handlers = [
	http.all('*', ({ request }) => {
		console.log(request.method, request.url)
	}),
] satisfies HttpHandler[]
