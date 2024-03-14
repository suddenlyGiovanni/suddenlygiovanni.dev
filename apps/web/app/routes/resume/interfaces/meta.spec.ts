// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Meta } from './meta.ts'

describe('Meta', () => {
	const metaInput = {
		canonical: 'https://example.com',
		lastModified: '2012-04-05T10:00:00.000Z',
		version: 'v6.9',
	} satisfies S.Schema.To<typeof Meta>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Meta)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('canonical', () => {
			expect(() => parse({ canonical: '' })).toThrow()
			expect(() => parse({ canonical: '  ' })).toThrow()
			expect(() => parse({ canonical: metaInput.canonical })).not.toThrow()
		})

		test('lastModified', () => {
			expect(() => parse({ lastModified: '' })).toThrow()
			expect(() => parse({ lastModified: '  ' })).toThrow()
			expect(() => parse({ lastModified: metaInput.lastModified })).not.toThrow()
		})

		test('version', () => {
			expect(() => parse({ version: '' })).toThrow()
			expect(() => parse({ version: '  ' })).toThrow()
			expect(() => parse({ version: metaInput.version })).not.toThrow()
		})
	})
})
