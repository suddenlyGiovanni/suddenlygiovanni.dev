import { HttpMiddleware, HttpServerRequest, HttpServerResponse } from '@effect/platform'
import { NodeHttpServerRequest } from '@effect/platform-node'
import { Data, Effect } from 'effect'
import { createServer } from 'vite'

class MiddlewareError extends Data.TaggedError('MiddlewareError')<{
	message: string
}> {}

export const viteMiddleware = HttpMiddleware.make(app =>
	Effect.gen(function* () {
		const viteDevServer = yield* Effect.promise(() =>
			createServer({ server: { middlewareMode: true } }),
		)
		const request = yield* HttpServerRequest.HttpServerRequest
		const req = NodeHttpServerRequest.toIncomingMessage(request)
		const res = NodeHttpServerRequest.toServerResponse(request)

		return yield* Effect.async<
			Effect.Effect.Success<typeof app>,
			Effect.Effect.Error<typeof app> | MiddlewareError,
			Effect.Effect.Context<typeof app>
		>(resume => {
			const listener = (): void => {
				resume(
					Effect.succeed(
						HttpServerResponse.raw(null, {
							status: res.statusCode,
							statusText: res.statusMessage,
						}),
					),
				)
			}

			res.once('close', listener)

			const next = (err?: unknown): void => {
				if (err) {
					resume(Effect.fail(new MiddlewareError({ message: String(err) })))
				} else {
					res.off('finish', listener)
					resume(app)
				}
			}

			viteDevServer.middlewares(req, res, next)
		})
	}),
)
