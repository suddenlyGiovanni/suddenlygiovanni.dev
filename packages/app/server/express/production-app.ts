import path from 'node:path/posix'
import express from 'express'

export async function productionApp(app: express.Express): Promise<express.Express> {
	console.log('Starting production server')
	const { app: reactRouterRequestHandler } = await getProductionModule()

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

function isModuleExpressApp(module: unknown): module is { app: express.Application } {
	return (
		!!module &&
		typeof module === 'object' &&
		'app' in module &&
		typeof module.app === 'function' && // First, must be a function itself
		'use' in module.app &&
		typeof module.app.use === 'function' && // Middleware registration
		'listen' in module.app &&
		typeof module.app.listen === 'function' && // Start server
		'get' in module.app &&
		typeof module.app.get === 'function' && // HTTP GET route handler
		'post' in module.app &&
		typeof module.app.post === 'function' && // HTTP POST route handler
		'set' in module.app &&
		typeof module.app.set === 'function' && // Set app settings
		'locals' in module.app &&
		typeof module.app.locals === 'object'
	)
}

class InvalidServerBuildFileError extends Error {
	constructor() {
		super('Invalid server build file; must export an Express application instance')
	}
}

/**
 * Asserts that the provided module is an object containing an Express application.
 *
 * @param module - The module to be validated.
 * @return Confirms that the module includes an Express application property if the assertion passes.
 */
function assertModuleExpressApp(module: unknown): asserts module is { app: express.Application } {
	if (!isModuleExpressApp(module)) {
		throw new InvalidServerBuildFileError()
	}
}

/**
 * Dynamically imports and resolves the production module for the application.
 * The method fetches the configuration, determines the server build path,
 * and ensures that the imported module meets the required structure through validation.
 *
 * @return A promise that resolves to the production module for the application.
 */
async function getProductionModule(): Promise<typeof import('./app.ts')> {
	return import('../../react-router.config.ts')
		.then(mod => mod.default)
		.then(({ buildDirectory, serverBuildFile }) =>
			path.resolve(path.join(buildDirectory, 'server', serverBuildFile)),
		)
		.then(serverBuildPath => import(serverBuildPath))
		.then((module: unknown) => {
			assertModuleExpressApp(module)
			return module
		})
}
