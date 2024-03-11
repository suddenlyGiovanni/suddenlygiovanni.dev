import * as S from '@effect/schema/Schema'
import { expect, test, describe } from 'vitest'
import { ISODateString } from './interface.ts'

describe('ISODateString', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(ISODateString)
		test('empty string', () => {
			expect(() => parse('')).toThrow()
		})

		test('YYYY-MM-DD', () => {
			expect(() => parse('2012-04-05')).toThrow()
		})

		test('YYYY-MM-DDTHH:MM:SS.sssZ', () => {
			expect(() => parse('2012-04-05T14:13:38.988Z')).not.toThrow()
			expect(() => parse('2024-03-11T14:13:38.988Z')).not.toThrow()
		})
	})
})
