import type express from 'express'

const viteDevServer = await import('vite').then(vite =>
	vite.createServer({ server: { middlewareMode: true } }),
)

const reactRouterRequestHandler: express.Handler = async (req, res, next) => {
	try {
		const _express = await (viteDevServer.ssrLoadModule('./server/express/app.ts') as Promise<
			typeof import('./app.ts')
		>)

		return _express.app(req, res, next)
	} catch (error: unknown) {
		if (typeof error === 'object' && error instanceof Error) {
			viteDevServer.ssrFixStacktrace(error)
		}
		next(error)
	}
}

export async function developmentApp(app: express.Express): Promise<express.Express> {
	console.log('Starting development server')

	return app //
		.use(viteDevServer.middlewares)
		.use(reactRouterRequestHandler)
}
