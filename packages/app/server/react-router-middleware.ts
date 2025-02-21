import { HttpMiddleware, HttpServerRequest, HttpServerResponse } from '@effect/platform'
import { NodeHttpServerRequest } from '@effect/platform-node'
import { Effect } from 'effect'

import { InvalidServerBuildFileError, getProductionServer } from './server.ts'

export const reactRouterMiddleware = HttpMiddleware.make(app =>
	Effect.gen(function* () {
		const reactRouterHandler = yield* Effect.tryPromise({
			try: () => getProductionServer(),
			catch: _ => new InvalidServerBuildFileError(),
		})

		const request = yield* HttpServerRequest.HttpServerRequest
		const req = NodeHttpServerRequest.toIncomingMessage(request)
		const res = NodeHttpServerRequest.toServerResponse(request)

		return yield* Effect.async<
			Effect.Effect.Success<typeof app>,
			Effect.Effect.Error<typeof app> | Error,
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
					resume(Effect.fail(new Error(String(err))))
				} else {
					res.off('finish', listener)
					resume(app)
				}
			}
			reactRouterHandler(req, res, next)
		})
	}),
)
