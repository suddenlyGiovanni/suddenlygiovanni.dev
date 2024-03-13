// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Reference } from './reference.ts'

describe('Reference', () => {
	const referenceInput = {
		name: 'Timothy Cook',
		reference:
			'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
	} satisfies S.Schema.To<typeof Reference>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Reference)

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: referenceInput.name })).not.toThrow()
		})

		test('reference', () => {
			expect(() => parse({ name: referenceInput.name, reference: '' })).toThrow()
			expect(() => parse({ name: referenceInput.name, reference: '  ' })).toThrow()
			expect(() =>
				parse({ name: referenceInput.name, reference: referenceInput.reference }),
			).not.toThrow()
		})
	})
})
