// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Interest } from './interest.ts'

describe('Interest', () => {
	const interestInput = {
		keywords: ['philosophy', 'distributed systems'],
		name: 'Philosophy',
	} satisfies S.Schema.Type<typeof Interest>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Interest)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('keywords', () => {
			expect(() => parse({ keywords: [] })).not.toThrow()
			expect(() => parse({ keywords: ['', '  '] })).toThrow()
			expect(() => parse({ keywords: interestInput.keywords })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: interestInput.name })).not.toThrow()
		})
	})
})
