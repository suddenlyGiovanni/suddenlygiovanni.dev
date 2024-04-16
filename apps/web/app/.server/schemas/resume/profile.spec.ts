import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Profile } from './profile.ts'

describe('Profile', () => {
	const profileInput: S.Schema.Encoded<typeof Profile> = {
		network: 'Facebook',
		url: 'http://twitter.example.com/neutralthoughts',
		username: 'neutralthoughts',
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Profile)

		test('network', () => {
			expect(() => parse({ ...profileInput, network: '' })).toThrow()
			expect(() => parse({ ...profileInput, network: '  ' })).toThrow()
			expect(() => parse({ ...profileInput, network: 'Twitter' })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...profileInput, url: '' })).toThrow()
			expect(() => parse({ ...profileInput, url: '  ' })).toThrow()
			expect(() => parse({ ...profileInput, url: 'http://localhost:8080' })).not.toThrow()
		})

		test('username', () => {
			expect(() => parse({ ...profileInput, username: '' })).toThrow()
			expect(() => parse({ ...profileInput, username: '  ' })).toThrow()
			expect(() => parse({ ...profileInput, username: 'realdonaldtrump' })).not.toThrow()
		})
	})
})
