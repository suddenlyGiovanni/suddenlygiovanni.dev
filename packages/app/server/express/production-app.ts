import path from 'node:path/posix'
import express from 'express'

const { reactRouterRequestHandler } = await import('../../react-router.config.ts')
	.then(mod => mod.default)
	.then(({ buildDirectory, serverBuildFile }) =>
		path.resolve(path.join(buildDirectory, 'server', serverBuildFile)),
	)
	.then(serverBuildPath => import(serverBuildPath))
	.then((module: typeof import('./app.ts')) => module)

/**
 * Configures an Express application for production use.
 *
 * This function sets up the production server by:
 * - Logging a startup message.
 * - Serving static asset files from the "build/client/assets" directory on the "/assets" route with caching enabled (immutable and max age of 1 year).
 * - Serving public files from the "build/client" directory with a cache max age of 1 hour.
 * - Adding the React Router middleware to handle routing.
 *
 * @param app - An instance of an Express application to be configured for production.
 * @returns The modified Express application instance with production middleware applied.
 */
export function productionApp<App extends express.Application>(app: App): App {
	console.log('Starting production server')

	return app
		.use(
			'/assets',
			/** Serve assets' files from build/client/assets */
			express.static('build/client/assets', {
				immutable: true,
				maxAge: '1y',
			}),
		)
		.use(
			/** Serve public files */
			express.static('build/client', { maxAge: '1h' }),
		)
		.use(
			/** Add React Router production middleware */
			reactRouterRequestHandler,
		)
}
