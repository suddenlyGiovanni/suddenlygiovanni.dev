import path from 'node:path/posix'
import express from 'express'
import morgan from 'morgan'

/**
 * Configures an Express application for production use.
 *
 * This asynchronous function dynamically loads the router configuration and server build module to apply production-specific middleware.
 * It sets up static file serving with caching, HTTP request logging via morgan, and integrates React Router middleware for handling requests.
 * On any import failure, it logs an error to the console and rethrows the error.
 *
 * @param app - The Express application instance to configure.
 * @returns A promise that resolves to the updated Express application.
 */
export async function productionApp<App extends express.Application>(app: App): Promise<App> {
	const { reactRouterRequestHandler } = await import('../../react-router.config.ts')
		.catch(error => {
			// biome-ignore lint/suspicious/noConsole: The chain of dynamic imports could fail silently.
			console.error('Failed to load router configuration:', error)
			throw error
		})
		.then(mod => mod.default)
		.then(({ buildDirectory, serverBuildFile }) =>
			path.resolve(path.join(buildDirectory, 'server', serverBuildFile)),
		)
		.catch(error => {
			// biome-ignore lint/suspicious/noConsole: The chain of dynamic imports could fail silently.
			console.error('Failed to load server build path:', error)
			throw error
		})
		.then(serverBuildPath => import(serverBuildPath))
		.catch(error => {
			// biome-ignore lint/suspicious/noConsole: The chain of dynamic imports could fail silently.
			console.error('Failed to load server build:', error)
			throw error
		})
		.then((module: typeof import('./app.ts')) => module)

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
		.use(morgan('short'))
		.use(
			/** Add React Router production middleware */
			reactRouterRequestHandler,
		)
}
