import type express from 'express'
import morgan from 'morgan'

export async function developmentApp<App extends express.Application>(app: App): Promise<App> {
	const viteDevServer = await import('vite').then(vite =>
		vite.createServer({ server: { middlewareMode: true } }),
	)

	const expressRequestHandler = await (
		viteDevServer.ssrLoadModule('./server/express/app.ts') as Promise<typeof import('./app.ts')>
	).then(({ reactRouterRequestHandler }) => reactRouterRequestHandler)

	console.log('Starting development server')
	return app
		.use(morgan('dev'))
		.use(viteDevServer.middlewares)
		.use(async (req, res, next) => {
			try {
				await expressRequestHandler(req, res, next)
			} catch (error: unknown) {
				if (error instanceof Error) {
					viteDevServer.ssrFixStacktrace(error)
					console.error('Request handler error:', error.message)
					console.debug(error.stack)
				}
				next(error)
			}
		})
}
