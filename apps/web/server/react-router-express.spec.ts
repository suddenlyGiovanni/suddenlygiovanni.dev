import { Readable } from 'node:stream'
import { createReadableStreamFromReadable } from '@react-router/node'
import express, { type Express } from 'express'
import { createRequest, createResponse } from 'node-mocks-http'
import { createRequestHandler as createRemixRequestHandler } from 'react-router'
import supertest from 'supertest'

import { type Mock, afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import {
	createRemixHeaders,
	createRemixRequest,
	createRequestHandler,
} from './react-router-express.ts'

/**
 * We don't want to test that the remix server works here
 * (that's what the playwright tests do), we just want to test the express adapter
 */
vi.mock('react-router', async () => {
	const original = await vi.importActual('react-router')
	return {
		...original,
		createRequestHandler: vi.fn(),
	}
})
const mockedCreateRequestHandler = createRemixRequestHandler as Mock<
	typeof createRemixRequestHandler
>

function createApp(): Express {
	const app = express()

	app.all(
		'*',
		/**
		 * We don't have a real app to test, but it doesn't matter.
		 * We won't ever call through to the real createRequestHandler
		 */
		// @ts-expect-error
		createRequestHandler({ build: {} }),
	)

	return app
}

describe('express createRequestHandler', () => {
	describe('basic requests', () => {
		afterEach(() => {
			mockedCreateRequestHandler.mockReset()
		})

		afterAll(() => {
			vi.restoreAllMocks()
		})

		it('handles requests', async () => {
			mockedCreateRequestHandler.mockImplementation(
				() =>
					// biome-ignore lint/suspicious/useAwait: <explanation>
					async (req: Request): Promise<Response> => {
						return new Response(`URL: ${new URL(req.url).pathname}`)
					},
			)

			const request = supertest(createApp())
			const res = await request.get('/foo/bar')

			expect(res.status).toBe(200)
			expect(res.text).toBe('URL: /foo/bar')
			expect(res.headers['x-powered-by']).toBe('Express')
		})

		it('handles root // URLs', async () => {
			mockedCreateRequestHandler.mockImplementation(
				() =>
					// biome-ignore lint/suspicious/useAwait: <explanation>
					async (req: Request): Promise<Response> => {
						return new Response(`URL: ${new URL(req.url).pathname}`)
					},
			)

			const request = supertest(createApp())
			const res = await request.get('//')

			expect(res.status).toBe(200)
			expect(res.text).toBe('URL: //')
		})

		it('handles nested // URLs', async () => {
			mockedCreateRequestHandler.mockImplementation(
				() =>
					// biome-ignore lint/suspicious/useAwait: <explanation>
					async (req: Request): Promise<Response> => {
						return new Response(`URL: ${new URL(req.url).pathname}`)
					},
			)

			const request = supertest(createApp())
			const res = await request.get('//foo//bar')

			expect(res.status).toBe(200)
			expect(res.text).toBe('URL: //foo//bar')
		})

		it('handles null body', async () => {
			// biome-ignore lint/suspicious/useAwait: <explanation>
			mockedCreateRequestHandler.mockImplementation(() => async (): Promise<Response> => {
				return new Response(null, { status: 200 })
			})

			const request = supertest(createApp())
			const res = await request.get('/')

			expect(res.status).toBe(200)
		})

		// https://github.com/node-fetch/node-fetch/blob/4ae35388b078bddda238277142bf091898ce6fda/test/response.js#L142-L148
		it('handles body as stream', async () => {
			// biome-ignore lint/suspicious/useAwait: <explanation>
			mockedCreateRequestHandler.mockImplementation(() => async (): Promise<Response> => {
				const readable = Readable.from('hello world')
				const stream = createReadableStreamFromReadable(readable)
				return new Response(stream, { status: 200 })
			})

			const request = supertest(createApp())
			const res = await request.get('/')
			expect(res.status).toBe(200)
			expect(res.text).toBe('hello world')
		})

		it('handles status codes', async () => {
			// biome-ignore lint/suspicious/useAwait: <explanation>
			mockedCreateRequestHandler.mockImplementation(() => async (): Promise<Response> => {
				return new Response(null, { status: 204 })
			})

			const request = supertest(createApp())
			const res = await request.get('/')

			expect(res.status).toBe(204)
		})

		it('sets headers', async () => {
			// biome-ignore lint/suspicious/useAwait: <explanation>
			mockedCreateRequestHandler.mockImplementation(() => async (): Promise<Response> => {
				const headers = new Headers({ 'X-Time-Of-Year': 'most wonderful' })
				headers.append('Set-Cookie', 'first=one; Expires=0; Path=/; HttpOnly; Secure; SameSite=Lax')
				headers.append(
					'Set-Cookie',
					'second=two; MaxAge=1209600; Path=/; HttpOnly; Secure; SameSite=Lax',
				)
				headers.append(
					'Set-Cookie',
					'third=three; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax',
				)
				return new Response(null, { headers })
			})

			const request = supertest(createApp())
			const res = await request.get('/')

			expect(res.headers['x-time-of-year']).toBe('most wonderful')
			expect(res.headers['set-cookie']).toEqual([
				'first=one; Expires=0; Path=/; HttpOnly; Secure; SameSite=Lax',
				'second=two; MaxAge=1209600; Path=/; HttpOnly; Secure; SameSite=Lax',
				'third=three; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax',
			])
		})
	})
})

describe('express createRemixHeaders', () => {
	describe('creates fetch headers from express headers', () => {
		it('handles empty headers', () => {
			const headers = createRemixHeaders({})
			expect(Object.fromEntries(headers.entries())).toMatchInlineSnapshot(`{}`)
		})

		it('handles simple headers', () => {
			const headers = createRemixHeaders({ 'x-foo': 'bar' })
			expect(headers.get('x-foo')).toBe('bar')
		})

		it('handles multiple headers', () => {
			const headers = createRemixHeaders({ 'x-foo': 'bar', 'x-bar': 'baz' })
			expect(headers.get('x-foo')).toBe('bar')
			expect(headers.get('x-bar')).toBe('baz')
		})

		it('handles headers with multiple values', () => {
			const headers = createRemixHeaders({
				'x-foo': ['bar', 'baz'],
				'x-bar': 'baz',
			})
			expect(headers.get('x-foo')).toEqual('bar, baz')
			expect(headers.get('x-bar')).toBe('baz')
		})

		it('handles multiple set-cookie headers', () => {
			const headers = createRemixHeaders({
				'set-cookie': [
					'__session=some_value; Path=/; Secure; HttpOnly; MaxAge=7200; SameSite=Lax',
					'__other=some_other_value; Path=/; Secure; HttpOnly; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Lax',
				],
			})
			expect(headers.getSetCookie()).toEqual([
				'__session=some_value; Path=/; Secure; HttpOnly; MaxAge=7200; SameSite=Lax',
				'__other=some_other_value; Path=/; Secure; HttpOnly; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Lax',
			])
		})
	})
})

describe('express createRemixRequest', () => {
	// biome-ignore lint/suspicious/useAwait: <explanation>
	it('creates a request with the correct headers', async () => {
		const expressRequest = createRequest({
			url: '/foo/bar',
			method: 'GET',
			protocol: 'http',
			hostname: 'localhost',
			headers: {
				'Cache-Control': 'max-age=300, s-maxage=3600',
				Host: 'localhost:3000',
			},
		})
		const expressResponse = createResponse()

		const remixRequest = createRemixRequest(expressRequest, expressResponse)

		expect(remixRequest.method).toBe('GET')
		expect(remixRequest.headers.get('cache-control')).toBe('max-age=300, s-maxage=3600')
		expect(remixRequest.headers.get('host')).toBe('localhost:3000')
	})
})
