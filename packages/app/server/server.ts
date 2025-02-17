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
 * Retrieves the production server application instance.
 *
 * This method dynamically imports the required configuration and server files
 * to set up and return the production server application.
 *
 * @return A promise resolving to the Express application instance.
 */
export async function getProductionServer(): Promise<typeof import('./app.ts').app> {
	return import('../react-router.config.ts')
		.then(mod => mod.default)
		.then(({ buildDirectory, serverBuildFile }) =>
			path.resolve(path.join(buildDirectory, 'server', serverBuildFile)),
		)
		.then(serverBuildPath => import(serverBuildPath))
		.then((module: unknown) => {
			if (
				module &&
				typeof module === 'object' &&
				'app' in module &&
				typeof module.app === 'function' &&
				typeof module.app === 'function' && // First, must be a function itself
				'use' in module.app &&
				typeof module.app.use === 'function' && // Middleware registration
				'listen' in module.app &&
				typeof module.app.listen === 'function' && // Start server
				'get' in module.app &&
				typeof module.app.get === 'function' && // HTTP GET route handler
				'post' in module.app &&
				typeof module.app.post === 'function' && // HTTP POST route handler
				'set' in module.app &&
				typeof module.app.set === 'function' && // Set app settings
				'locals' in module.app &&
				typeof module.app.locals === 'object' // App-local variables
			) {
				return module.app as typeof import('./app.ts').app
			}

			throw new InvalidServerBuildFileError()
		})
}

/**
 * Represents the default port number used for the application.
 * This value is typically used as the fallback port if no custom port is specified.
 * The default port is set to 5173.
 */
export const DEFAULT_PORT = 5173

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
	} = await Config.decodeUnknownPromise(process.env).catch((error: ParseResult.ParseError) => {
		console.error(error.message, error.cause)
		process.exit(1)
	})

	// biome-ignore lint/style/useNamingConvention: <explanation>
	const PORT = await getPort({ port: _port ?? DEFAULT_PORT })

	const app: express.Express = express()
		.disable('x-powered-by')
		/**
		 * Add compression middleware
		 */
		.use(compression())

	switch (NODE_ENV) {
		case 'development': {
			console.log('Starting development server')

			const viteDevServer: ViteDevServer = await import('vite').then(vite =>
				vite.createServer({ server: { middlewareMode: true } }),
			)

			app
				/**
				 * Add React Router development middleware
				 */
				.use(viteDevServer.middlewares) //
				.use(async (req, res, next) => {
					try {
						const source = await viteDevServer.ssrLoadModule('./server/app.ts')
						// biome-ignore lint/complexity/useLiteralKeys: <explanation>
						return await source['app'](req, res, next)
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
			const handler = await getProductionServer()

			app
				/**
				 * Serve assets files from build/client/assets
				 */
				.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }))
				/**
				 * Serve public files
				 */
				.use(express.static('build/client', { maxAge: '1h' }))
				/**
				 * Add React Router production middleware
				 */
				.use(handler)

			break
		}
		default:
			throw new NodeEnvError(NODE_ENV)
	}

	/**
	 * Add logger middleware
	 */
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

	const server: http.Server = HOST ? app.listen(PORT, HOST, onListen) : app.listen(PORT, onListen)

	/**
	 * Handles application shutdown gracefully upon receiving specific termination signals.
	 *
	 * This function listens for termination signals ('SIGTERM' or 'SIGINT') and performs
	 * necessary actions to close the server safely. It logs the received signal, proceeds
	 * to close the server, and exits the process with an appropriate exit code depending
	 * on whether the shutdown was successful or encountered errors.
	 *
	 * @param {('SIGTERM' | 'SIGINT')} signal The termination signal received, triggering the graceful shutdown process.
	 * @returns {void} Does not return a value.
	 */
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

/**
 * Represents an error that occurs when an undefined or invalid `NODE_ENV` value is encountered.
 *
 * This error class is specifically designed to handle unexpected or invalid
 * `NODE_ENV` values that are not handled in the application.
 *
 * @param _nodeEnv - The invalid or unexpected `NODE_ENV` value, provided to enforce type safety.
 */
class NodeEnvError extends Error {
	constructor(_nodeEnv: never) {
		super('Unknown NODE_ENV')
	}
}

export class InvalidServerBuildFileError extends Error {
	constructor() {
		super('Invalid server build file; must export an Express application instance')
	}
}
