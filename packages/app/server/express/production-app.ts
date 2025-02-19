import path from 'node:path/posix'
import express from 'express'

const { reactRouterRequestHandler } = await import('../../react-router.config.ts')
	.then(mod => mod.default)
	.then(({ buildDirectory, serverBuildFile }) =>
		path.resolve(path.join(buildDirectory, 'server', serverBuildFile)),
	)
	.then(serverBuildPath => import(serverBuildPath))
	.then((module: typeof import('./app.ts')) => module)

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
