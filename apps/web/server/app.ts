import 'react-router'
import { createRequestHandler } from '@react-router/express'
import express, { type Express } from 'express'
import type { ServerBuild } from 'react-router'

declare module 'react-router' {
	interface AppLoadContext {
		VALUE_FROM_EXPRESS: string
	}
}

export const app: Express = express()

app.use(
	createRequestHandler({
		build(): Promise<ServerBuild> {
			// @ts-expect-error - virtual module provided by React Router at build time
			return import('virtual:react-router/server-build')
		},
		getLoadContext(): import('react-router').AppLoadContext {
			return {
				VALUE_FROM_EXPRESS: 'Hello from Express',
			}
		},
	}),
)
