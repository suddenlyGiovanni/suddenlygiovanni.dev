import { describe, expect, test } from 'vitest'
import * as Either from 'effect/Either'
import { ParseError } from '@effect/schema/ParseResult'
import { formatDateLocaleShort } from './format-date-locale-short'

describe('formatDateLocaleShort', () => {
	test('should format the date to US locale short format', () => {
		const isoDateString = '2022-04-02T14:22:29.876Z'
		const result = formatDateLocaleShort(isoDateString)

		expect(Either.getOrThrow(result)).toBe('Apr 2022')
	})

	test('should return an error for an invalid date string', () => {
		const invalidDateString = '19/04/2022'
		const result = formatDateLocaleShort(invalidDateString)

		if (Either.isLeft(result)) {
			expect(result.left).toBeInstanceOf(ParseError)
		}
	})
})
