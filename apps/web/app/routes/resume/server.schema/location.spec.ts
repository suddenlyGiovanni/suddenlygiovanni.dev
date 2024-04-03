// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Location } from './location.ts'

describe('Location', () => {
	const locationInput = {
		address: '1234 Glücklichkeit Straße Hinterhaus 5. Etage li.',
		city: 'Berlin',
		countryCode: 'DE',
		postalCode: '10999',
		region: 'California',
	} satisfies S.Schema.Encoded<typeof Location>

	const required: S.Schema.Encoded<typeof Location> = {
		countryCode: locationInput.countryCode,
		city: locationInput.city,
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Location)

		test('handle all missing property', () => {
			const input: unknown = { ...required }
			expect(() => parse(input)).not.toThrow()
		})

		test('address', () => {
			expect(() => parse({ ...required, address: '' })).toThrow()
			expect(() => parse({ ...required, address: '  ' })).toThrow()
			expect(() => parse({ ...required, address: '   Booger Hollow Road 69' })).not.toThrow()
		})

		test('city', () => {
			expect(() => parse({ ...required, city: '' })).toThrow()
			expect(() => parse({ ...required, city: '  ' })).toThrow()
			expect(() => parse({ ...required, city: 'Constantinople' })).not.toThrow()
		})

		test('countryCode', () => {
			expect(() => parse({ ...required, countryCode: '' })).toThrow()
			expect(() => parse({ ...required, countryCode: '  ' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'D' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'DEUTSCHLAND' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'de' })).not.toThrow()
			expect(() => parse({ ...required, countryCode: 'AU' })).not.toThrow()
		})

		test('postalCode', () => {
			expect(() => parse({ ...required, postalCode: '' })).toThrow()
			expect(() => parse({ ...required, postalCode: '  ' })).toThrow()
			// expect(() => parse({ postalCode: 'ABCS' })).toThrow()
			expect(() => parse({ ...required, postalCode: '90210' })).not.toThrow()
		})

		test('region', () => {
			expect(() => parse({ ...required, region: '' })).toThrow()
			expect(() => parse({ ...required, region: '  ' })).toThrow()
			expect(() => parse({ ...required, region: 'Mississippi' })).not.toThrow()
		})
	})
})
