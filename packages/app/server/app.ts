import 'react-router'
import process from 'node:process'
import express from 'express'
import type { ServerBuild } from 'react-router'

import { createRequestHandler } from './react-router-express.ts'

declare module 'react-router' {
	interface AppLoadContext {
		VALUE_FROM_EXPRESS: string
	}
}

export const app: express.Application = express().use(
	createRequestHandler({
		build(): Promise<ServerBuild> {
			// @ts-expect-error - virtual module provided by React Router at build time
			return import('virtual:react-router/server-build')
		},
		getLoadContext(): import('react-router').AppLoadContext {
			return { VALUE_FROM_EXPRESS: 'Hello from Express' }
		},
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		mode: process.env['NODE_ENV'] || 'production',
	}),
)
