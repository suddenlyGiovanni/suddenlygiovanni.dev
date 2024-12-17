import fs from 'node:fs'
import type * as http from 'node:http'
import os from 'node:os'
import path from 'node:path/posix'
import process from 'node:process'
import url from 'node:url'

import compression from 'compression'
import { type ParseResult, Schema } from 'effect'
import express from 'express'
import getPort from 'get-port'
import morgan from 'morgan'
import sourceMapSupport from 'source-map-support'
import type { ViteDevServer } from 'vite'

class Config extends Schema.Class<Config>('Config')({
	NODE_ENV: Schema.optionalWith(Schema.Literal('development', 'production'), {
		default: () => 'production',
	}).annotations({
		description: 'Environment to run the server in',
	}),
	PORT: Schema.optional(Schema.NumberFromString.pipe(Schema.int())).annotations({
		description: 'Port to run the server on',
	}),
	HOST: Schema.optional(Schema.String).annotations({
		description: 'Host to run the server on',
	}),
	buildPathArg: Schema.String.annotations({
		description: 'Path to the server build',
		message: () => 'Usage: node server/server.ts <server-build-path>',
	}),
}) {
	static decodeUnknownPromise = Schema.decodeUnknownPromise(this)
}

sourceMapSupport.install({
	retrieveSourceMap(source: string): { url: string; map: string } | null {
		const match = source.startsWith('file://')
		if (match) {
			const filePath = url.fileURLToPath(source)
			const sourceMapPath = `${filePath}.map`
			if (fs.existsSync(sourceMapPath)) {
				return {
					url: source,
					map: fs.readFileSync(sourceMapPath, 'utf8'),
				}
			}
		}
		return null
	},
})

/**
 * Initiates and runs a server application for serving a React Router build.
 * The method performs the following operations:
 * - Configures server port dynamically from environment or default settings.
 * - Resolves and loads the server build path.
 * - Sets up an Express application with necessary middlewares including compression, static file serving, and logging.
 * - Configures routes for serving client-side assets and handling all incoming requests with a request handler.
 * - Listens to the configured port and outputs server address details to the console.
 * - Cleans up resources and stops the server gracefully on receiving termination signals.
 *
 * @return {Promise<void>} A promise that resolves when the server successfully starts.
 * @example
 * ```sh
 * NODE_ENV=development               \
 * PORT=3000                          \
 * node                               \
 *  --inspect-wait                    \
 *  --watch                           \
 *  --experimental-network-inspection \
 *  --experimental-strip-types        \
 *  --experimental-transform-types    \
 *  server/main.ts ./build/server/index.js
 * ```
 */
export async function run(): Promise<http.Server> {
	const {
		NODE_ENV,
		PORT: _port,
		HOST,
		buildPathArg,
	} = await Config.decodeUnknownPromise({
		...process.env,
		buildPathArg: process.argv[2],
	}).catch((error: ParseResult.ParseError) => {
		console.error(error.message, error.cause)
		process.exit(1)
	})

	// biome-ignore lint/style/useNamingConvention: <explanation>
	const PORT = await getPort({ port: _port ?? 5173 })

	const app: express.Express = express()

	app.disable('x-powered-by')

	app.use(compression())

	switch (NODE_ENV) {
		case 'development': {
			console.log('Starting development server')

			const viteDevServer: ViteDevServer = await import('vite').then(vite =>
				vite.createServer({
					server: { middlewareMode: true },
				}),
			)

			app.use(viteDevServer.middlewares)
			app.use(async (req, res, next) => {
				try {
					const source = (await viteDevServer.ssrLoadModule('./server/app.ts')) as {
						app: express.Express
					}
					return await source.app(req, res, next)
				} catch (error: unknown) {
					if (typeof error === 'object' && error instanceof Error) {
						viteDevServer.ssrFixStacktrace(error)
					}
					next(error)
				}
			})

			break
		}
		case 'production': {
			console.log('Starting production server')

			app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }))

			app.use(express.static('build/client', { maxAge: '1h' }))

			app.use(await import(path.resolve(buildPathArg)).then(mod => mod.app))

			break
		}
		default:
			throw new Error(`Unknown NODE_ENV: ${NODE_ENV}`)
	}

	app.use(morgan('tiny'))

	const onListen = (): void => {
		const address =
			HOST ||
			Object.values(os.networkInterfaces())
				.flat()
				.find(ip => String(ip?.family).includes('4') && !ip?.internal)?.address

		if (address) {
			console.log(`[react-router-serve] http://localhost:${PORT} (http://${address}:${PORT})`)
		} else {
			console.log(`[react-router-serve] http://localhost:${PORT}`)
		}
	}

	const server = HOST ? app.listen(PORT, HOST, onListen) : app.listen(PORT, onListen)

	const gracefulShutdown = (signal: 'SIGTERM' | 'SIGINT'): void => {
		console.log(`Received shutdown signal "${signal}", closing server gracefully...`)
		server?.close(err => {
			if (err) {
				console.error('Error during server shutdown:', err)
				process.exit(1)
			}
			console.log('Server closed gracefully.')
			process.exit(0)
		})
	}

	for (const signal of ['SIGTERM', 'SIGINT']) {
		process.once(signal, gracefulShutdown)
	}

	return server
}

run()
