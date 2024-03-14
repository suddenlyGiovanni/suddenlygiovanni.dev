// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Profile } from './profile.ts'

describe('Profile', () => {
	const profileInput: S.Schema.To<typeof Profile> = {
		network: 'Facebook',
		url: 'http://twitter.example.com/neutralthoughts',
		username: 'neutralthoughts',
	} satisfies S.Schema.To<typeof Profile>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Profile)
		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('network', () => {
			expect(() => parse({ network: '' })).toThrow()
			expect(() => parse({ network: '  ' })).toThrow()
			expect(() => parse({ network: profileInput.network })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: profileInput.url })).not.toThrow()
		})

		test('username', () => {
			expect(() => parse({ username: '' })).toThrow()
			expect(() => parse({ username: '  ' })).toThrow()
			expect(() => parse({ username: profileInput.username })).not.toThrow()
		})
	})
})
