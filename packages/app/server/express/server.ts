import fs from 'node:fs'
import type * as http from 'node:http'
import os from 'node:os'
import process from 'node:process'
import url from 'node:url'
import compression from 'compression'
import { type ParseResult, Schema } from 'effect'
import express from 'express'
import getPort from 'get-port'
import morgan from 'morgan'
import sourceMapSupport from 'source-map-support'

import { developmentApp } from './development-app.ts'

class Config extends Schema.Class<Config>('Config')({
	NODE_ENV: Schema.optionalWith(Schema.Literal('development', 'production'), {
		default: () => 'production',
	}).annotations({ description: 'Environment to run the server in' }),
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
	retrieveSourceMap(source) {
		const match = source.startsWith('file://')
		if (match) {
			const filePath = url.fileURLToPath(source)
			const sourceMapPath = `${filePath}.map`
			if (fs.existsSync(sourceMapPath)) {
				return { url: source, map: fs.readFileSync(sourceMapPath, 'utf8') }
			}
		}
		return null
	},
})

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
 *  --experimental-transform-types    \
 *  server/express/server.ts
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

	const port = await getPort({ port: _port ?? DEFAULT_PORT })

	function onListen(error?: Error): void {
		const address =
			HOST ||
			Object.values(os.networkInterfaces())
				.flat()
				.find(ip => String(ip?.family).includes('4') && !ip?.internal)?.address

		console.log(
			address
				? `[react-router-serve] http://localhost:${port} (http://${address}:${port})`
				: `[react-router-serve] http://localhost:${port}`,
		)

		if (error) console.error(error)
	}

	let app = express() //
		.disable('x-powered-by')
		.use(compression())

	app =
		NODE_ENV === 'development'
			? developmentApp(app) //
			: await import('./production-app.ts').then(({ productionApp }) => productionApp(app))

	/**
	 * Add logger middleware
	 */
	app.use(morgan('tiny'))

	const httpServer: http.Server = HOST //
		? app.listen(port, HOST, onListen)
		: app.listen(port, onListen)

	for (const signal of ['SIGTERM', 'SIGINT'] as const) {
		/**
		 * Handles application shutdown gracefully upon receiving specific termination signals.
		 *
		 * This function listens for termination signals ('SIGTERM' or 'SIGINT') and performs
		 * necessary actions to close the server safely. It logs the received signal, proceeds
		 * to close the server, and exits the process with an appropriate exit code depending
		 * on whether the shutdown was successful or encountered errors.
		 *
		 * @param {('SIGTERM' | 'SIGINT')} signal The termination signal received, triggering the graceful shutdown process.
		 * @returns Does not return a value.
		 */
		process.once(signal, (_signal: typeof signal) => {
			console.log(`Received shutdown signal "${_signal}", closing server gracefully...`)
			httpServer?.close(err => {
				if (err) {
					console.error('Error during server shutdown:', err)
					process.exit(1)
				}
				console.log('Server closed gracefully.')
				process.exit(0)
			})
		})
	}

	return httpServer
}

run()
