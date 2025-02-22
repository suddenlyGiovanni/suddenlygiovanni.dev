import type express from 'express'
import morgan from 'morgan'

/**
 * Configures an Express application for development with Vite middleware.
 *
 * This asynchronous function initializes a Vite development server in middleware mode and dynamically loads a server module
 * that provides a request handler for React routing. It sets up HTTP request logging, integrates Vite's middleware, and
 * attaches a custom request handler that fixes error stack traces before passing errors to the next middleware.
 * If loading the server module fails, the error is logged and rethrown.
 *
 * @param app The Express application instance to configure.
 * @returns A promise that resolves with the configured Express application.
 * @throws Error if the server module fails to load.
 */
export async function developmentApp<App extends express.Application>(app: App): Promise<App> {
	const viteDevServer = await import('vite').then(vite =>
		vite.createServer({ server: { middlewareMode: true } }),
	)

	const expressRequestHandler = await (
		viteDevServer.ssrLoadModule('./server/express/app.ts').catch(error => {
			// biome-ignore lint/suspicious/noConsole: The dynamic module loading could fail silently
			console.error('Fail to load server module:', error)
			throw error
		}) as Promise<typeof import('./app.ts')>
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
