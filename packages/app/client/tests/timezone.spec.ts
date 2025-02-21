// biome-ignore lint/correctness/noNodejsModules: Required for accessing process.env in tests
import { env } from 'node:process'
import { describe, expect, it } from 'vitest'

describe('date utils tests', () => {
	it('timezone should return UTC', () => {
		expect.hasAssertions()
		// my local timezone 'Europe/Dublin' was returned instead
		expect(env.TZ).toBe('UTC')
	})

	const unixTime = new Date('1970-01-01')
	const dayBeforeUnixTime = new Date('1969-12-31')

	it('unixTime should have correct ISO string', () => {
		expect.hasAssertions()
		expect(unixTime.toISOString()).toBe('1970-01-01T00:00:00.000Z')
	})

	it('unixTime should have correct timestamp', () => {
		expect.hasAssertions()
		expect(unixTime.getTime()).toBe(0)
	})

	it('unixTime should have correct UTC string', () => {
		expect.hasAssertions()
		expect(unixTime.toUTCString()).toBe('Thu, 01 Jan 1970 00:00:00 GMT')
	})

	it('dayBeforeUnixTime should have correct ISO string', () => {
		expect.hasAssertions()
		expect(dayBeforeUnixTime.toISOString()).toBe('1969-12-31T00:00:00.000Z')
	})
})
