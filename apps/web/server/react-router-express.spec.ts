import type net from 'node:net'
import { Readable } from 'node:stream'

import { createReadableStreamFromReadable } from '@react-router/node'
import { Schema } from 'effect'
import express, { type Express } from 'express'
import { createRequest, createResponse } from 'node-mocks-http'
import { type ServerBuild, createRequestHandler as createRemixRequestHandler } from 'react-router'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'

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

const mockedCreateRequestHandler = vi.mocked(createRemixRequestHandler)

function createApp(): Express {
	const app = express()

	app.all(
		'*',
		/**
		 * We don't have a real app to test, but it doesn't matter.
		 * We won't ever call through to the real createRequestHandler
		 */
		createRequestHandler({
			build: {} as ServerBuild,
		}),
	)

	return app
}

function assertAddressInfo(
	address: net.AddressInfo | string | null,
): asserts address is net.AddressInfo {
	try {
		Schema.decodeUnknownSync(
			Schema.Struct({
				address: Schema.String,
				family: Schema.String,
				port: Schema.Number,
			}),
		)(address)
	} catch (error) {
		throw new Error('Expected address to be an AddressInfo', {
			cause: error instanceof Error ? error.cause : undefined,
		})
	}
}

async function makeFetchRequest(app: Express, path: string): Promise<Response> {
	const server = app.listen(0)
	const address = server.address()
	assertAddressInfo(address)
	const { port } = address
	const url = `http://localhost:${port}${path}`
	const response = await fetch(url)
	server.close()
	return response
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
			// ARRANGE
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(
				() =>
					(req): Promise<Response> =>
						Promise.resolve(new Response(`URL: ${new URL(req.url).pathname}`)),
			)
			const app = createApp()

			// ACT
			const res = await makeFetchRequest(app, '/foo/bar')

			// ASSERT
			expect(res.status).toBe(200)
			await expect(res.text()).resolves.toBe('URL: /foo/bar')
			expect(res.headers.get('x-powered-by')).toBe('Express')
		})

		it('handles root // URLs', async () => {
			// ARRANGE
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(
				() =>
					(req: Request): Promise<Response> =>
						Promise.resolve(new Response(`URL: ${new URL(req.url).pathname}`)),
			)

			// ACT
			const res = await makeFetchRequest(createApp(), '//')

			// ASSERT
			expect(res.status).toBe(200)
			await expect(res.text()).resolves.toBe('URL: //')
		})

		it('handles nested // URLs', async () => {
			// ARRANGE
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(
				() =>
					(req: Request): Promise<Response> =>
						Promise.resolve(new Response(`URL: ${new URL(req.url).pathname}`)),
			)

			// ACT
			const res = await makeFetchRequest(createApp(), '//foo//bar')

			// ASSERT
			expect(res.status).toBe(200)
			await expect(res.text()).resolves.toBe('URL: //foo//bar')
		})

		it('handles null body', async () => {
			// ARRANGE
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(
				() => (): Promise<Response> => Promise.resolve(new Response(null, { status: 200 })),
			)

			// ACT
			const res = await makeFetchRequest(createApp(), '/')

			// ASSERT
			expect(res.status).toBe(200)
		})

		// https://github.com/node-fetch/node-fetch/blob/4ae35388b078bddda238277142bf091898ce6fda/test/response.js#L142-L148
		it('handles body as stream', async () => {
			// ARRANGE
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(() => (): Promise<Response> => {
				const readable = Readable.from('hello world')
				const stream = createReadableStreamFromReadable(readable)
				return Promise.resolve(new Response(stream, { status: 200 }))
			})

			// ACT
			const res = await makeFetchRequest(createApp(), '/')

			// ASSERT
			expect(res.status).toBe(200)
			await expect(res.text()).resolves.toBe('hello world')
		})

		it('handles status codes', async () => {
			// ARRANGE
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(
				() => (): Promise<Response> => Promise.resolve(new Response(null, { status: 204 })),
			)

			// ACT
			const res = await makeFetchRequest(createApp(), '/')

			// ASSERT
			expect(res.status).toBe(204)
		})

		it('sets headers', async () => {
			expect.hasAssertions()

			mockedCreateRequestHandler.mockImplementation(() => (): Promise<Response> => {
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
				return Promise.resolve(new Response(null, { headers }))
			})

			const res = await makeFetchRequest(createApp(), '/')

			expect(res.headers.get('x-time-of-year')).toBe('most wonderful')
			expect(res.headers.getSetCookie()).toStrictEqual([
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
			expect.hasAssertions()

			const headers = createRemixHeaders({})

			expect(Object.fromEntries(headers.entries())).toMatchInlineSnapshot('{}')
		})

		it('handles simple headers', () => {
			expect.hasAssertions()

			const headers = createRemixHeaders({ 'x-foo': 'bar' })

			expect(headers.get('x-foo')).toBe('bar')
		})

		it('handles multiple headers', () => {
			expect.hasAssertions()

			const headers = createRemixHeaders({ 'x-foo': 'bar', 'x-bar': 'baz' })

			expect(headers.get('x-foo')).toBe('bar')

			expect(headers.get('x-bar')).toBe('baz')
		})

		it('handles headers with multiple values', () => {
			expect.hasAssertions()

			const headers = createRemixHeaders({
				'x-foo': ['bar', 'baz'],
				'x-bar': 'baz',
			})

			expect(headers.get('x-foo')).toBe('bar, baz')

			expect(headers.get('x-bar')).toBe('baz')
		})

		it('handles multiple set-cookie headers', () => {
			expect.hasAssertions()

			const headers = createRemixHeaders({
				'set-cookie': [
					'__session=some_value; Path=/; Secure; HttpOnly; MaxAge=7200; SameSite=Lax',
					'__other=some_other_value; Path=/; Secure; HttpOnly; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Lax',
				],
			})

			expect(headers.getSetCookie()).toStrictEqual([
				'__session=some_value; Path=/; Secure; HttpOnly; MaxAge=7200; SameSite=Lax',
				'__other=some_other_value; Path=/; Secure; HttpOnly; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Lax',
			])
		})
	})
})

describe('express createRemixRequest', () => {
	it('creates a request with the correct headers', () => {
		expect.hasAssertions()

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
