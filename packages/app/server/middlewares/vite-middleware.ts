import { HttpMiddleware, HttpServerRequest, HttpServerResponse } from '@effect/platform'
import { NodeHttpServerRequest } from '@effect/platform-node'
import { Data, Effect } from 'effect'

import { ViteDevServerService } from '../services/vite-service.ts'

class MiddlewareError extends Data.TaggedError('MiddlewareError')<{
	message: string
}> {}

/**
 * `viteMiddleware` is an HTTP middleware instance created using `HttpMiddleware.make`.
 * It integrates Vite's development server middleware into an HTTP server and handles
 * incoming requests by delegating them to Vite's middleware. This allows the application
 * to process requests during development with Vite's middleware logic.
 *
 * Internally, the middleware transforms the request and response objects into a format
 * compatible with Vite's `viteDevServer.middleware`. It also handles lifecycle events
 * like `finish` and `close` on the response object to manage the request processing state.
 *
 * Features:
 *  - Sets up Vite's development server in middleware mode.
 *  - Converts HTTP server requests and responses to Node.js-compatible objects.
 *  - Handles errors during request delegation by wrapping them in `MiddlewareError`.
 *  - Manages the completion of request handling and terminates properly.
 *
 * Dependencies:
 *  - Specific integration with `vite` for development server capabilities.
 *  - Requires `HttpMiddleware`, `Effect`, `HttpServerRequest`, and `HttpServerResponse`.
 *
 * Error Handling:
 * If an error occurs during request processing by Vite's middleware, it will fail with
 * a `MiddlewareError`, containing details of the encountered issue.
 */
export const viteMiddleware = HttpMiddleware.make(app =>
	Effect.gen(function* () {
		// we need to call the viteDevServer.middleware to hand off the request to Vite,
		// there are some issues:
		// 1. viteDevServer.middleware is expecting an connect/express request/response object
		// 2. viteDevServer.middleware is also expecting a next callback function to be passed to it used for error handling and to signal that the request has been handled
		// 3. once we call viteDevServer.middleware, it will handle the request, also terminating the request handling in the current function and we won't be able to do anything else with the request in
		const httpServerRequest = yield* HttpServerRequest.HttpServerRequest
		const incomingMessage = NodeHttpServerRequest.toIncomingMessage(httpServerRequest)
		const serverResponse = NodeHttpServerRequest.toServerResponse(httpServerRequest)

		const viteDevServer = yield* ViteDevServerService

		return yield* Effect.async<
			Effect.Effect.Success<typeof app>,
			Effect.Effect.Error<typeof app> | MiddlewareError,
			Effect.Effect.Context<typeof app>
		>(resume => {
			const listener = (): void => {
				resume(
					Effect.succeed(
						HttpServerResponse.raw(null, {
							status: serverResponse.statusCode,
							statusText: serverResponse.statusMessage,
						}),
					),
				)
			}

			/**
			 * @event: 'close'
			 * Indicates that the response is completed, or its underlying connection was terminated prematurely (before the response completion).
			 *
			 * @event: 'finish'
			 * Emitted when the response has been sent. More specifically, this event is emitted when the last segment of the response headers and body have been handed off to the operating system for transmission over the network. It does not imply that the client has received anything yet.
			 */
			serverResponse.once('close', listener)

			viteDevServer.middlewares(incomingMessage, serverResponse, (err?: unknown): void => {
				if (err) {
					resume(Effect.fail(new MiddlewareError({ message: String(err) })))
				} else {
					serverResponse.off('close', listener)
					resume(app)
				}
			})
		})
	}),
)
