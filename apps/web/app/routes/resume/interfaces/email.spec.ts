import * as S from '@effect/schema/Schema'
import { expect, test, describe } from 'vitest'
import { Email } from './email.ts'

describe('Email', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(Email)

		test('empty string', () => {
			expect(() => parse('')).toThrow()
		})

		test('invalid email', () => {
			expect(() => parse('testemail')).toThrow()
			expect(() => parse('abc.def@')).toThrow()
			expect(() => parse('@another-email.com')).toThrow()
			expect(() => parse('MISSING_DOMAIN_NAME@.com')).toThrow()
			expect(() => parse('@onlydomain.com')).toThrow()
			expect(() => parse('email@domain')).toThrow()
			expect(() => parse('justastring')).toThrow()
			expect(() => parse('missing@.dot')).toThrow()
			expect(() => parse('no@multiple..dots')).toThrow()
			expect(() => parse('@.com')).toThrow()
		})
		test('valid email', () => {
			expect(() => parse('testemail@test.com')).not.toThrow()
			expect(() => parse('abc.def@subdomain.domain.com')).not.toThrow()
			expect(() => parse('another-email@test.co.uk')).not.toThrow()
			expect(() => parse('EMAIL_WORKS@testserver.NET')).not.toThrow()
			expect(() => parse('1234567890@1234567890.com')).not.toThrow()
		})
	})
})
