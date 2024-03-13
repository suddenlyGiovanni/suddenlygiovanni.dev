import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Award } from './award.ts'

describe('award', () => {
	const awardInput: S.Schema.To<typeof Award> = {
		awarder: 'Time Magazine',
		title: 'One of the 100 greatest minds of the century',
		date: '1970-01-01T00:00:00.000Z',
		summary: 'Received for my work with Quantum Physics',
	} satisfies S.Schema.To<typeof Award>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Award)
		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('awarder', () => {
			expect(() => parse({ awarder: '' })).toThrow()
			expect(() => parse({ awarder: '  ' })).toThrow()
			expect(() => parse({ awarder: awardInput.awarder })).not.toThrow()
		})

		test('date', () => {
			expect(() => parse({ date: '' })).toThrow()
			expect(() => parse({ awarder: awardInput.awarder })).not.toThrow()
		})

		test('title', () => {
			expect(() => parse({ title: '' })).toThrow()
			expect(() => parse({ title: '  ' })).toThrow()
			expect(() => parse({ title: awardInput.title })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: '  ' })).toThrow()
			expect(() => parse({ summary: awardInput.summary })).not.toThrow()
		})
	})
})
