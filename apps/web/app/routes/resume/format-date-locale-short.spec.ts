import { Either } from 'effect'

import { ParseError } from 'effect/ParseResult'
import { describe, expect, test } from 'vitest'
import { formatDateLocaleShort } from './format-date-locale-short.ts'

describe('formatDateLocaleShort', () => {
	test('should return an error for an empty string', () => {
		const result = formatDateLocaleShort('')
		expect(Either.isLeft(result)).toBe(true)
		if (Either.isLeft(result)) {
			expect(result.left).toBeInstanceOf(ParseError)
		}
	})

	test('should return an error for an invalid date string', () => {
		const invalidDateString = '19/04/2022'
		const result = formatDateLocaleShort(invalidDateString)

		expect(Either.isLeft(result)).toBe(true)
		if (Either.isLeft(result)) {
			expect(result.left).toBeInstanceOf(ParseError)
		}
	})

	test('should format the date to US locale short format', () => {
		const isoDateString1 = '2022-04-01T14:22:29.876Z'
		const isoDateString2 = '2022-04-30'
		const result1 = formatDateLocaleShort(isoDateString1)
		const result2 = formatDateLocaleShort(isoDateString2)
		expect(Either.getOrThrow(result1)).toBe('Apr 2022')
		expect(Either.getOrThrow(result2)).toBe('Apr 2022')
	})
})
