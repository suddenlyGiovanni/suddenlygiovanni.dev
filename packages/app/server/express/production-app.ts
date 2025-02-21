import path from 'node:path/posix'
import express from 'express'
import morgan from 'morgan'

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
