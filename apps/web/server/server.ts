import fs from 'node:fs'
import os from 'node:os'
import process from 'node:process'
import url from 'node:url'
import compression from 'compression'
import express from 'express'
import getPort from 'get-port'
import morgan from 'morgan'
import sourceMapSupport from 'source-map-support'
import type { ViteDevServer } from 'vite'

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
	const buildPath = './build/server/index.js'
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	// biome-ignore lint/style/useNamingConvention: <explanation>
	const DEVELOPMENT = process.env['NODE_ENV'] === 'development'
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	// biome-ignore lint/style/useNamingConvention: <explanation>
	const PORT = parseNumber(process.env['PORT']) ?? (await getPort({ port: 3000 }))

	// const buildPathArg = process.argv[2]

	// if (!buildPathArg) {
	// 	// biome-ignore lint/suspicious/noConsole: <explanation>
	// 	console.error(`
	// Usage: react-router-serve <server-build-path> - e.g. react-router-serve build/server/index.js`)
	// 	process.exit(1)
	// }

	// const buildPath = path.resolve(buildPathArg)

	// const build: ServerBuild = await import(url.pathToFileURL(buildPath).href)

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
			console.log(`[react-router-serve] http://localhost:${PORT} (http://${address}:${PORT})`)
		} else {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			console.log(`[react-router-serve] http://localhost:${PORT}`)
		}
	}

	const app = express()

	app.disable('x-powered-by')

	app.use(compression())

	if (DEVELOPMENT) {
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
	} else {
		console.log('Starting production server')

		app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }))

		app.use(express.static('build/client', { maxAge: '1h' }))
		app.use(await import(buildPath).then(mod => mod.app))
	}

	// app.use(
	// 	path.posix.join(build.publicPath, 'assets'),
	// 	express.static(path.join(build.assetsBuildDirectory, 'assets'), {
	// 		immutable: true,
	// 		maxAge: '1y',
	// 	}),
	// )

	// app.use(build.publicPath, express.static(build.assetsBuildDirectory))

	// app.use(express.static('public', { maxAge: '1h' }))

	app.use(morgan('tiny'))

	// app.all(
	// 	'*',
	// 	createRequestHandler({
	// 		build,
	// 		// biome-ignore lint/style/noNonNullAssertion: <explanation>
	// 		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	// 		mode: process.env['NODE_ENV']!,
	// 	}),
	// )

	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	const server = process.env['HOST']
		? // biome-ignore lint/complexity/useLiteralKeys: <explanation>
			app.listen(PORT, process.env['HOST'], onListen)
		: app.listen(PORT, onListen)

	for (const signal of ['SIGTERM', 'SIGINT']) {
		process.once(signal, () => server?.close(console.error))
	}
}