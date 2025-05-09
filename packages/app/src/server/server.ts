import { createServer } from 'node:http'

import { HttpMiddleware, HttpRouter, HttpServer, HttpServerResponse } from '@effect/platform'
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Console, Effect, flow, Layer } from 'effect'

import { PublicAssetsMiddleware, StaticAssetsMiddleware } from './middlewares/assets-middleware.ts'
import { viteMiddleware } from './middlewares/vite-middleware.ts'
import { ConfigService, ViteDevServerService } from './services/index.ts'

const ServerLive = ConfigService.pipe(
	Effect.map(({ PORT }) => NodeHttpServer.layer(createServer, { port: PORT })),
	Layer.unwrapEffect,
)

const HttpLive = ConfigService.pipe(
	Effect.andThen(({ NODE_ENV }) =>
		NODE_ENV === 'production'
			? HttpRouter.empty.pipe(
					HttpRouter.all(
						'*',
						Effect.promise(() => {
							// @ts-expect-error - This is a dynamic import of build stuff
							return import('../../build/server/index.js') as Promise<
								typeof import('./handler/handler.ts')
							>
						}).pipe(Effect.flatMap(module => module.handler)),
					),

					HttpRouter.use(StaticAssetsMiddleware),

					HttpRouter.use(PublicAssetsMiddleware),
				)
			: HttpRouter.empty
					.pipe(
						HttpRouter.all(
							'*',
							ViteDevServerService.pipe(
								Effect.flatMap(viteDevServer =>
									Effect.promise(
										() =>
											viteDevServer.ssrLoadModule('./src/server/handler/handler.ts') as Promise<
												typeof import('./handler/handler.ts')
											>,
									),
								),
								Effect.flatMap(({ handler }) => handler),
							),
						),

						HttpRouter.use(viteMiddleware),
					)
					.pipe(Effect.provide(ViteDevServerService.Default)),
	),
	Effect.catchTags({
		RouteNotFound: _ =>
			Effect.gen(function* () {
				yield* Console.error('Route Not Found', _)
				return yield* HttpServerResponse.text('Route Not Found', {
					status: 404,
				})
			}),
	}),

	Effect.catchAllCause(cause =>
		Effect.gen(function* () {
			yield* Console.error(cause)
			return yield* HttpServerResponse.text(cause.toString(), { status: 500 })
		}),
	),

	HttpServer.serve(flow(HttpMiddleware.xForwardedHeaders, HttpMiddleware.logger)),
	HttpServer.withLogAddress,
	Layer.provide(ServerLive),
)

NodeRuntime.runMain(Layer.launch(HttpLive))
