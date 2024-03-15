// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Language } from './language.ts'

describe('Language', () => {
	const languageInput = {
		fluency: 'Fluent',
		language: 'English',
	} satisfies S.Schema.Type<typeof Language>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Language)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('fluency', () => {
			expect(() => parse({ fluency: '' })).toThrow()
			expect(() => parse({ fluency: '  ' })).toThrow()
			expect(() => parse({ fluency: languageInput.fluency })).not.toThrow()
		})

		test('language', () => {
			expect(() => parse({ language: '' })).toThrow()
			expect(() => parse({ language: '  ' })).toThrow()
			expect(() => parse({ language: languageInput.language })).not.toThrow()
		})
	})
})
