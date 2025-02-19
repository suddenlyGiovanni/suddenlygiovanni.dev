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

export function developmentApp<App extends express.Application>(app: App): App {
	console.log('Starting development server')

	return app //
		.use(viteDevServer.middlewares)
		.use(reactRouterRequestHandler)
}
