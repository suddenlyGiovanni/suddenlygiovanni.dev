import { describe, expect, test } from 'vitest'
import { isLeft, getOrThrow } from 'effect/Either'
import { ParseError } from '@effect/schema/ParseResult'
import { formatDateLocaleShort } from './format-date-locale-short'

describe('formatDateLocaleShort', () => {
	test('should return an error for an empty string', () => {
		const result = formatDateLocaleShort('')
		expect(isLeft(result)).toBe(true)
		if (isLeft(result)) {
			expect(result.left).toBeInstanceOf(ParseError)
		}
	})

	test('should return an error for an invalid date string', () => {
		const invalidDateString = '19/04/2022'
		const result = formatDateLocaleShort(invalidDateString)

		expect(isLeft(result)).toBe(true)
		if (isLeft(result)) {
			expect(result.left).toBeInstanceOf(ParseError)
		}
	})

	test('should format the date to US locale short format', () => {
		const isoDateString1 = '2022-04-01T14:22:29.876Z'
		const isoDateString2 = '2022-04-30'
		const result1 = formatDateLocaleShort(isoDateString1)
		const result2 = formatDateLocaleShort(isoDateString2)
		expect(getOrThrow(result1)).toBe('Apr 2022')
		expect(getOrThrow(result2)).toBe('Apr 2022')
	})
})
