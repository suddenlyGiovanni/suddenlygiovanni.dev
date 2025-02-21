import process from 'node:process'
import type { ServerBuild } from 'react-router'

import { type RequestHandler, createRequestHandler } from '../adapters/react-router-express.ts'

export const reactRouterRequestHandler: RequestHandler = createRequestHandler({
	build(): Promise<ServerBuild> {
		// @ts-expect-error - virtual module provided by React Router at build time
		return import('virtual:react-router/server-build')
	},
	getLoadContext(): import('react-router').AppLoadContext {
		return { VALUE_FROM_EXPRESS: 'Hello from Express' }
	},
	mode: process.env['NODE_ENV'] ?? 'production',
})
