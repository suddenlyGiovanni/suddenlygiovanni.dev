import process from 'node:process'
import { createReadableStreamFromReadable, writeReadableStreamToWritable } from '@react-router/node'
import type * as express from 'express'
import type { AppLoadContext, ServerBuild } from 'react-router'
import { createRequestHandler as createRemixRequestHandler } from 'react-router'

/**
 * A function that returns the value to use as `context` in route `loader` and
 * `action` functions.
 *
 * You can think of this as an escape hatch that allows you to pass
 * environment/platform-specific values through to your loader/action, such as
 * values that are generated by Express middleware like `req.session`.
 */
export type GetLoadContextFunction = (
	req: express.Request,
	res: express.Response,
) => Promise<AppLoadContext> | AppLoadContext

export type RequestHandler = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => Promise<void>

/**
 * Returns a request handler for Express that serves the response using Remix.
 */
export function createRequestHandler({
	build,
	getLoadContext,
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	mode = process.env['NODE_ENV'],
}: {
	build: ServerBuild | (() => Promise<ServerBuild>)
	getLoadContext?: GetLoadContextFunction
	mode?: ('development' | 'production') | (string & {})
}): RequestHandler {
	const handleRequest = createRemixRequestHandler(build, mode)

	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	): Promise<void> => {
		try {
			const request = createRemixRequest(req, res)
			const loadContext = await getLoadContext?.(req, res)

			const response = await handleRequest(request, loadContext)

			await sendRemixResponse(res, response)
		} catch (error: unknown) {
			// Express doesn't support async functions, so we have to pass along the
			// error manually using next().
			next(error)
		}
	}
}

export function createRemixHeaders(requestHeaders: express.Request['headers']): Headers {
	const headers = new Headers()

	for (const [key, values] of Object.entries(requestHeaders)) {
		if (values) {
			if (Array.isArray(values)) {
				for (const value of values) {
					headers.append(key, value)
				}
			} else {
				headers.set(key, values)
			}
		}
	}

	return headers
}

export function createRemixRequest(req: express.Request, res: express.Response): Request {
	// req.hostname doesn't include port information so grab that from
	// `X-Forwarded-Host` or `Host`
	const [, hostnamePort] = req.get('X-Forwarded-Host')?.split(':') ?? []
	const [, hostPort] = req.get('host')?.split(':') ?? []
	const port = hostnamePort || hostPort
	// Use req.hostname here as it respects the "trust proxy" setting
	const resolvedHost = `${req.hostname}${port ? `:${port}` : ''}`
	// Use `req.originalUrl` so Remix is aware of the full path
	const url = new URL(`${req.protocol}://${resolvedHost}${req.originalUrl}`)

	// Abort action/loaders once we can no longer write a response
	let controller: AbortController | null = new AbortController()
	const init: RequestInit = {
		method: req.method,
		headers: createRemixHeaders(req.headers),
		signal: controller.signal,
	}

	// Abort action/loaders once we can no longer write a response iff we have
	// not yet sent a response (i.e., `close` without `finish`)
	// `finish` -> done rendering the response
	// `close` -> response can no longer be written to
	res.on('finish', () => {
		controller = null
	})

	res.on('close', () => {
		controller?.abort()
	})

	if (req.method !== 'GET' && req.method !== 'HEAD') {
		init.body = createReadableStreamFromReadable(req)
		;(init as { duplex: 'half' }).duplex = 'half'
	}

	return new Request(url.href, init)
}

export async function sendRemixResponse(
	res: express.Response,
	nodeResponse: Response,
): Promise<void> {
	res.statusMessage = nodeResponse.statusText
	res.status(nodeResponse.status)

	for (const [key, value] of nodeResponse.headers.entries()) {
		res.append(key, value)
	}

	if (nodeResponse.headers.get('Content-Type')?.match(/text\/event-stream/i)) {
		res.flushHeaders()
	}

	if (nodeResponse.body) {
		await writeReadableStreamToWritable(nodeResponse.body, res)
	} else {
		res.end()
	}
}
