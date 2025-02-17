import {
	FileSystem,
	HttpMiddleware,
	HttpRouter,
	HttpServer,
	HttpServerResponse,
} from '@effect/platform'
import { Effect, Schema, pipe } from 'effect'

import { listen } from './listen.ts'
import { reactRouterMiddleware } from './react-router-middleware.ts'
import { viteMiddleware } from './vite-middleware.ts'

const AssetsSchemaParams = Schema.Struct({
	assetName: Schema.String.annotations({
		description: 'The file name of the asset to serve',
		examples: ['index.html', 'tailwind-BheVJGT0.css'],
	}),
})

const oneMinute = 60
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour
const oneYear = 365 * oneDay

// Define the router with a single route for the root URL
const router = pipe(
	HttpRouter.empty,
	HttpRouter.get(
		'/assets/:assetName',
		Effect.gen(function* () {
			const params = yield* HttpRouter.schemaParams(AssetsSchemaParams)
			const fs = yield* FileSystem.FileSystem
			const filePath = `build/client/assets/${params.assetName}`
			if (yield* fs.exists(filePath)) {
				const serverResponse = yield* HttpServerResponse.file(filePath)

				return serverResponse.pipe(
					HttpServerResponse.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`),
				)
			}
			return HttpServerResponse.empty({ status: 404 })
		}),
	),
	HttpRouter.get(
		'/:assetName',
		Effect.gen(function* () {
			const params = yield* HttpRouter.schemaParams(AssetsSchemaParams)
			const fs = yield* FileSystem.FileSystem
			const filePath = `build/client/${params.assetName}`
			if (yield* fs.exists(filePath)) {
				const serverResponse = yield* HttpServerResponse.file(filePath)

				return serverResponse.pipe(
					HttpServerResponse.setHeader('Cache-Control', `max-age=${oneHour}`),
				)
			}
			return HttpServerResponse.empty({ status: 404 })
		}),
	),
	HttpRouter.use(viteMiddleware),
	HttpRouter.use(reactRouterMiddleware),
)

// Set up the application server with logging
const app = pipe(
	router, //
	HttpServer.serve(HttpMiddleware.logger),
	HttpServer.withLogAddress,
)

listen(app, 3000)
