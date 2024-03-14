import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Certificate } from './certificates'

describe('Certificate', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(Certificate)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: 'Certified Kubernetes Administrator' })).not.toThrow()
		})

		test('date', () => {
			expect(() => parse({ date: '' })).toThrow()
			expect(() => parse({ date: '2018-01-01' })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: 'http://example.com/cert.pdf' })).not.toThrow()
		})

		test('issuer', () => {
			expect(() => parse({ issuer: '' })).toThrow()
			expect(() => parse({ issuer: '  ' })).toThrow()
			expect(() => parse({ issuer: 'CNCF' })).not.toThrow()
		})
	})
})
