// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Basics } from './basics.ts'

describe('Basics', () => {
	const basicsInput = {
		email: 'thomas@gmail.com',
		image: 'http://example.com/image.jpg',
		label: 'Software Engineer',
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
	} satisfies S.Schema.Encoded<typeof Basics>

	const required: S.Schema.Encoded<typeof Basics> = {
		name: basicsInput.name,
		label: basicsInput.label,
		email: basicsInput.email,
		summary: basicsInput.summary,
		location: {
			city: basicsInput.location.city,
			countryCode: basicsInput.location.countryCode,
		},
		profiles: [],
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Basics)

		test('handle all missing property', () => {
			const input: unknown = required
			expect(() => parse(input)).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ ...required, name: '' })).toThrow()
			expect(() => parse({ ...required, name: '  ' })).toThrow()
			expect(() => parse({ ...required, name: basicsInput.name })).not.toThrow()
		})

		test('label', () => {
			expect(() => parse({ ...required, label: '' })).toThrow()
			expect(() => parse({ ...required, label: '  ' })).toThrow()
			expect(() => parse({ ...required, label: basicsInput.label })).not.toThrow()
		})

		test('email', () => {
			expect(() => parse({ ...required, email: '' })).toThrow()
			expect(() => parse({ ...required, email: '  ' })).toThrow()
			expect(() => parse({ ...required, email: basicsInput.email })).not.toThrow()
		})

		test('image', () => {
			expect(() => parse({ ...required, image: '' })).toThrow()
			expect(() => parse({ ...required, image: '  ' })).toThrow()
			expect(() => parse({ ...required, image: basicsInput.image })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ ...required, location: {} })).toThrow()
			expect(() => parse({ ...required, location: basicsInput.location })).not.toThrow()
		})

		test('phone', () => {
			expect(() => parse({ ...required, phone: '' })).toThrow()
			expect(() => parse({ ...required, phone: '  ' })).toThrow()
			expect(() => parse({ ...required, phone: ' abcdefghijk' })).toThrow()
			expect(() => parse({ ...required, phone: basicsInput.phone })).not.toThrow()
		})

		test('profiles', () => {
			expect(() => parse({ ...required, profiles: [] })).not.toThrow()
			expect(() => parse({ ...required, profiles: basicsInput.profiles })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ ...required, summary: '' })).toThrow()
			expect(() => parse({ ...required, summary: '  ' })).toThrow()
			expect(() => parse({ ...required, summary: basicsInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...required, url: '' })).toThrow()
			expect(() => parse({ ...required, url: '  ' })).toThrow()
			expect(() => parse({ ...required, url: basicsInput.url })).not.toThrow()
		})
	})
})
