// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Publication } from './publication.ts'

describe('Publication', () => {
	const publicationInput = {
		name: 'The World Wide Web',
		publisher: 'IEEE, Computer Magazine',
		releaseDate: '2022-04-05T10:00:00.000Z',
		summary: 'Discussion of the World Wide Web, HTTP, HTML',
		url: 'http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html',
	} satisfies S.Schema.To<typeof Publication>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Publication)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: publicationInput.name })).not.toThrow()
		})

		test('publisher', () => {
			expect(() => parse({ publisher: '' })).toThrow()
			expect(() => parse({ publisher: '  ' })).toThrow()
			expect(() => parse({ publisher: publicationInput.publisher })).not.toThrow()
		})

		test('releaseDate', () => {
			expect(() => parse({ releaseDate: '' })).toThrow()
			expect(() => parse({ releaseDate: '  ' })).toThrow()
			expect(() => parse({ releaseDate: publicationInput.releaseDate })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: '  ' })).toThrow()
			expect(() => parse({ summary: publicationInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: publicationInput.url })).not.toThrow()
		})
	})
})
