import { Headers, HttpServerRequest, HttpServerResponse } from '@effect/platform'
import { NodeHttpServerRequest } from '@effect/platform-node'
import * as ReactRouterNode from '@react-router/node'
import { Effect, Stream } from 'effect'
import * as ReactRouter from 'react-router'

import { ConfigService } from '../services/config-service.ts'

export const handler = Effect.gen(function* () {
	const { NODE_ENV } = yield* ConfigService

	const handleRequest = ReactRouter.createRequestHandler(
		// @ts-expect-error - The virtual module is created at build time by Vite and doesn't exist for TypeScript
		() => import('virtual:react-router/server-build'),
		NODE_ENV,
	)

	const httpServerRequest = yield* HttpServerRequest.HttpServerRequest
	const incomingMessage = NodeHttpServerRequest.toIncomingMessage(httpServerRequest)
	const serverResponse = NodeHttpServerRequest.toServerResponse(httpServerRequest)

	// Extract protocol
	const xForwardedProto = incomingMessage.headersDistinct['x-forwarded-proto']?.[0] as
		| undefined
		| 'http'
		| 'https'

	const protocol: 'http' | 'https' =
		xForwardedProto ||
		(incomingMessage.socket &&
		'encrypted' in incomingMessage.socket &&
		incomingMessage.socket.encrypted
			? 'https'
			: 'http')

	// Extract hostname and port from headers
	const xForwardedHost = incomingMessage.headersDistinct['x-forwarded-host']?.[0]
	const hostHeader = (xForwardedHost || incomingMessage.headers.host) ?? ''

	// Split hostname and port
	const [hostname, hostPort = ''] = hostHeader.split(':')

	/**
	 * Use hostname from headers with respect to forwarded host
	 */
	const resolvedHost = `${hostname}${hostPort ? `:${hostPort}` : ''}`
	/**
	 * Create full URL so React Router is aware of the full path
	 */
	const url = new URL(`${protocol}://${resolvedHost}${incomingMessage.url ?? ''}`)

	/**
	 * Abort action/loaders once we can no longer write a response
	 */
	let controller: null | AbortController = new AbortController()
	const init: RequestInit = {
		method: httpServerRequest.method,
		headers: httpServerRequest.headers,
		signal: controller.signal,
	}

	/**
	 * Abort action/loaders once we can no longer write a response iff we have
	 * not yet sent a response (i.e., `close` without `finish`)
	 * `finish` -> done rendering the response
	 * `close` -> response can no longer be written to
	 */
	serverResponse.on('finish', () => {
		controller = null
	})
	serverResponse.on('close', () => controller?.abort())

	if (incomingMessage.method !== 'GET' && incomingMessage.method !== 'HEAD') {
		init.body = ReactRouterNode.createReadableStreamFromReadable(incomingMessage)
		;(init as { duplex: 'half' }).duplex = 'half'
	}

	const request = new Request(url.href, init)

	const loadContext = {
		VALUE_FROM_PLATFORM: 'Hello from `@effect/platform`',
	} satisfies ReactRouter.AppLoadContext

	const response: Response = yield* Effect.promise(() => handleRequest(request, loadContext))
	if (response.headers.get('Content-Type')?.match(/text\/event-stream/i)) {
		serverResponse.flushHeaders()
	}

	const options: HttpServerResponse.Options = {
		status: response.status,
		statusText: response.statusText,
		headers: Headers.fromInput(response.headers),
	}

	if (response.body) {
		return yield* HttpServerResponse.stream(
			Stream.fromReadableStream(
				() => response.body || new ReadableStream(),
				error => new Error(`Error reading response stream: ${String(error)}`),
			),
			options,
		)
	}

	return yield* HttpServerResponse.empty(options)
})
