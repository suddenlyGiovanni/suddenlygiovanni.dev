import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/node.ts'

beforeAll(() => {
	server.listen({
		onUnhandledRequest: 'error',
	})
})

afterEach(() => {
	server.resetHandlers()
})

afterAll(() => {
	server.close()
})
