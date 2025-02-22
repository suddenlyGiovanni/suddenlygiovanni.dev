import process from 'node:process'
import type { ServerBuild } from 'react-router'

import { type RequestHandler, createRequestHandler } from '../adapters/react-router-express.ts'

export const reactRouterRequestHandler: RequestHandler = createRequestHandler({
	build(): Promise<ServerBuild> {
		// @ts-expect-error This is expected as the virtual module 'virtual:react-router/server-build'
		// is dynamically injected by React Router's build process and cannot be statically typed.
		// The module provides the server-side build configuration at runtime.
		return import('virtual:react-router/server-build')
	},
	getLoadContext(): import('react-router').AppLoadContext {
		return { VALUE_FROM_EXPRESS: 'Hello from Express' }
	},
	mode: process.env['NODE_ENV'] ?? 'production',
})
