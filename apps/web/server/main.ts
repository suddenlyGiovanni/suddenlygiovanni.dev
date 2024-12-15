import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { createRequestHandler } from '@react-router/express'
import compression from 'compression'
import express from 'express'
import getPort from 'get-port'
import morgan from 'morgan'
import type { ServerBuild } from 'react-router'
import sourceMapSupport from 'source-map-support'

import { parseNumber } from './utils.ts'

// biome-ignore lint/complexity/useLiteralKeys: <explanation>
process.env['NODE_ENV'] = process.env['NODE_ENV'] ?? 'production'

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

run()

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
async function run(): Promise<void> {
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	const port = parseNumber(process.env['PORT']) ?? (await getPort({ port: 3000 }))

	const buildPathArg = process.argv[2]

	if (!buildPathArg) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error(`
  Usage: react-router-serve <server-build-path> - e.g. react-router-serve build/server/index.js`)
		process.exit(1)
	}

	const buildPath = path.resolve(buildPathArg)

	const build: ServerBuild = await import(url.pathToFileURL(buildPath).href)

	const onListen = (): void => {
		const address =
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			process.env['HOST'] ||
			Object.values(os.networkInterfaces())
				.flat()
				.find(ip => String(ip?.family).includes('4') && !ip?.internal)?.address

		if (address) {
			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.log(`[react-router-serve] http://localhost:${port} (http://${address}:${port})`)
		} else {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			console.log(`[react-router-serve] http://localhost:${port}`)
		}
	}

	const app = express()

	app.disable('x-powered-by')

	app.use(compression())

	app.use(
		path.posix.join(build.publicPath, 'assets'),
		express.static(path.join(build.assetsBuildDirectory, 'assets'), {
			immutable: true,
			maxAge: '1y',
		}),
	)

	app.use(build.publicPath, express.static(build.assetsBuildDirectory))

	app.use(express.static('public', { maxAge: '1h' }))

	app.use(morgan('tiny'))

	app.all(
		'*',
		createRequestHandler({
			build,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			mode: process.env['NODE_ENV']!,
		}),
	)

	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	const server = process.env['HOST']
		? // biome-ignore lint/complexity/useLiteralKeys: <explanation>
			app.listen(port, process.env['HOST'], onListen)
		: app.listen(port, onListen)

	for (const signal of ['SIGTERM', 'SIGINT']) {
		process.once(signal, () => server?.close(console.error))
	}
}
