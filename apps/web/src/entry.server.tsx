// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { PassThrough } from 'node:stream'
import { createReadableStreamFromReadable } from '@react-router/node'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { type AppLoadContext, type EntryContext, ServerRouter } from 'react-router'

import { getEnv, init } from '#utils/env.server.ts'

const ABORT_DELAY = 5_000

init()
global.ENV = getEnv()

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
	_loadContext: AppLoadContext,
): Promise<unknown> {
	return isbot(request.headers.get('user-agent'))
		? handleBotRequest(request, responseStatusCode, responseHeaders, reactRouterContext)
		: handleBrowserRequest(request, responseStatusCode, responseHeaders, reactRouterContext)
}

function handleBotRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		let shellRendered = false
		const { pipe, abort } = renderToPipeableStream(
			<ServerRouter
				context={reactRouterContext}
				url={request.url}
				abortDelay={ABORT_DELAY}
			/>,
			{
				onAllReady(): void {
					shellRendered = true
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown): void {
					reject(error)
				},
				onError(error: unknown): void {
					// biome-ignore lint/style/noParameterAssign: this is how Remix defined the default entry.server
					responseStatusCode = 500
					/*
					 Log streaming rendering errors from inside the shell.  Don't log
					 errors encountered during initial shell rendering since they'll
					 reject and get logged in handleDocumentRequest.
					*/
					if (shellRendered) {
						// biome-ignore lint/suspicious/noConsole: legit console error statement.
						console.error(error)
					}
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}

function handleBrowserRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		let shellRendered = false
		const { pipe, abort } = renderToPipeableStream(
			<ServerRouter
				context={reactRouterContext}
				url={request.url}
				abortDelay={ABORT_DELAY}
			/>,
			{
				onShellReady(): void {
					shellRendered = true
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown): void {
					reject(error)
				},
				onError(error: unknown): void {
					// biome-ignore lint/style/noParameterAssign: this is how Remix defined the default entry.server
					responseStatusCode = 500
					/*
					 Log streaming rendering errors from inside the shell.  Don't log
					 errors encountered during initial shell rendering since they'll
					 reject and get logged in handleDocumentRequest.
					*/
					if (shellRendered) {
						// biome-ignore lint/suspicious/noConsole: legit console error statement.
						console.error(error)
					}
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}
