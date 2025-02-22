import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import process from 'node:process'
import url from 'node:url'

import compression from 'compression'
import { type ParseResult, Schema } from 'effect'
import express from 'express'
import getPort from 'get-port'
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
			try {
				if (fs.existsSync(sourceMapPath)) {
					return { url: source, map: fs.readFileSync(sourceMapPath, 'utf8') }
				}
			} catch (error) {
				console.warn(`Failed to load source map for ${source}:`, error)
			}
		}
		return null
	},
})

/**
 * Handles application shutdown gracefully upon receiving specific termination signals.
 *
 * This function listens for termination signals ('SIGTERM' or 'SIGINT') and performs
 * necessary actions to close the server safely. It logs the received signal, proceeds
 * to close the server, and exits the process with an appropriate exit code depending
 * on whether the shutdown was successful or encountered errors.
 */
function setupGracefulShutdown(server: http.Server): void {
	for (const signal of ['SIGTERM', 'SIGINT'] as const) {
		process.once(signal, (_signal: typeof signal) => {
			console.log(`Received shutdown signal "${_signal}", closing server gracefully...`)
			server.close(err => {
				if (err) {
					console.error('Error during server shutdown:', err)
					process.exit(1)
				}
				console.log('Server closed gracefully.')
				process.exit(0)
			})
		})
	}
}

/**
 * Represents the default port number used for the application.
 * This value is typically used as the fallback port if no custom port is specified.
 * The default port is set to 5173.
 */
export const DEFAULT_PORT = 5173

/**
 * Starts an HTTP server with an Express application to serve a React Router build.
 *
 * This asynchronous function decodes environment variables, selects an available port (defaulting when necessary),
 * and configures the Express application with compression middleware. Depending on the NODE_ENV setting, it dynamically
 * loads either a development or production build to handle client-side routing. It also sets up listeners for termination
 * signals (SIGTERM and SIGINT) to gracefully shut down the server.
 *
 * @returns A promise that resolves with the created HTTP server instance once the server has started.
 *
 * @example
 * // Start the server in development mode on port 3000:
 * // NODE_ENV=development PORT=3000 node server/express/server.ts
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

	/**
	 * Callback executed upon server startup.
	 *
	 * If an error is provided, logs the failure message and terminates the process.
	 * Otherwise, resolves the server's network address—using a predefined host if available or by
	 * discovering a non-internal IPv4 address—and logs the local and external URLs for accessing the server.
	 *
	 * @param error - An optional error encountered during server startup.
	 */
	function onListen(error?: Error): void {
		if (error) {
			console.error('[react-router-serve] Failed to start server:', error)
			process.exit(1)
		}
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
	}

	let app = express() //
		.disable('x-powered-by')
		.use(compression())

	app = await (NODE_ENV === 'development'
		? developmentApp(app) //
		: import('./production-app.ts') //
				.then(({ productionApp }) => productionApp(app)))

	const httpServer = http.createServer(app)

	setupGracefulShutdown(httpServer)

	if (HOST) {
		httpServer.listen(port, HOST, onListen)
	} else {
		httpServer.listen(port, onListen)
	}

	return httpServer
}

run()
