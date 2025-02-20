import type express from 'express'

const viteDevServer = await import('vite').then(vite =>
	vite.createServer({ server: { middlewareMode: true } }),
)

const expressRequestHandler = await (
	viteDevServer.ssrLoadModule('./server/express/app.ts') as Promise<typeof import('./app.ts')>
).then(({ reactRouterRequestHandler }) => reactRouterRequestHandler)

const reactRouterRequestHandler: typeof expressRequestHandler = async (req, res, next) => {
	try {
		await expressRequestHandler(req, res, next)
	} catch (error: unknown) {
		if (error instanceof Error) {
			viteDevServer.ssrFixStacktrace(error)
		}
		next(error)
	}
}

/**
 * Configures an Express application for development by attaching Vite middlewares and a React Router request handler.
 *
 * This function logs the start of the development server, and it integrates the Vite development server's middlewares
 * with the supplied Express app. It also sets up the React Router request handler, which includes error handling via
 * Vite's stack trace fixer.
 *
 * @param app - The Express application instance to configure with development server middleware.
 * @returns The modified Express application instance with Vite and React Router integrations.
 */
export function developmentApp<App extends express.Application>(app: App): App {
	console.log('Starting development server')

	return app //
		.use(viteDevServer.middlewares)
		.use(reactRouterRequestHandler)
}
