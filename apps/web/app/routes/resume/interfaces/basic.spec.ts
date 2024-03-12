import * as S from '@effect/schema/Schema'
import { expect, test, describe } from 'vitest'

import { Basics } from './basics.ts'

describe('Basics', () => {
	const basicsInput: S.Schema.To<typeof Basics> = {
		email: 'thomas@gmail.com',
		image: 'http://example.com/image.jpg',
		label: 'Web Developer',
		location: {
			address: '1234 Glücklichkeit Straße Hinterhaus 5. Etage li.',
			city: 'Berlin',
			countryCode: 'DE',
			postalCode: '10999',
			region: 'California',
		},
		name: 'Thomas Anderson',
		phone: '+4907121172923',
		profiles: [
			{
				network: 'Facebook',
				url: 'http://twitter.example.com/neutralthoughts',
				username: 'neutralthoughts',
			},
		],
		summary: 'Web Developer with a passion for web-based applications',
		url: 'http://thomasanderson.com',
	} satisfies S.Schema.To<typeof Basics>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Basics)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('email', () => {
			expect(() => parse({ email: '' })).toThrow()
			expect(() => parse({ email: '  ' })).toThrow()
			expect(() => parse({ email: basicsInput.email })).not.toThrow()
		})

		test('image', () => {
			expect(() => parse({ image: '' })).toThrow()
			expect(() => parse({ image: '  ' })).toThrow()
			expect(() => parse({ image: basicsInput.image })).not.toThrow()
		})

		test('label', () => {
			expect(() => parse({ label: '' })).toThrow()
			expect(() => parse({ label: '  ' })).toThrow()
			expect(() => parse({ label: basicsInput.label })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ location: {} })).not.toThrow()
			expect(() => parse({ location: basicsInput.location })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: basicsInput.name })).not.toThrow()
		})

		test('phone', () => {
			expect(() => parse({ phone: '' })).toThrow()
			expect(() => parse({ phone: '  ' })).toThrow()
			expect(() => parse({ phone: basicsInput.phone })).not.toThrow()
		})

		test('profiles', () => {
			expect(() => parse({ profiles: [] })).not.toThrow()
			expect(() => parse({ profiles: basicsInput.profiles })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: '  ' })).toThrow()
			expect(() => parse({ summary: basicsInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: basicsInput.url })).not.toThrow()
		})
	})
})
