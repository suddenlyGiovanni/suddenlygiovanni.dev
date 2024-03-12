import * as S from '@effect/schema/Schema'
import { expect, test, describe } from 'vitest'

import { Profile } from './profile.ts'

describe('profile', () => {
	const awardInput: S.Schema.To<typeof Profile> = {
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
			expect(() => parse({ network: awardInput.network })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: awardInput.url })).not.toThrow()
		})

		test('username', () => {
			expect(() => parse({ username: '' })).toThrow()
			expect(() => parse({ username: '  ' })).toThrow()
			expect(() => parse({ username: awardInput.username })).not.toThrow()
		})
	})
})
