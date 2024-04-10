// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { ISODateString } from './iso-date-string.ts'

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
