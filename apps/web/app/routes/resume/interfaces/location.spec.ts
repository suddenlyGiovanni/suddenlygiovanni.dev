// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Location } from './location.ts'

describe('Location', () => {
	const locationInput: S.Schema.Type<typeof Location> = {
		address: '1234 Glücklichkeit Straße Hinterhaus 5. Etage li.',
		city: 'Berlin',
		countryCode: 'DE',
		postalCode: '10999',
		region: 'California',
	} satisfies S.Schema.Type<typeof Location>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Location)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('address', () => {
			expect(() => parse({ address: '' })).toThrow()
			expect(() => parse({ address: '  ' })).toThrow()
			expect(() => parse({ address: locationInput.address })).not.toThrow()
		})

		test('city', () => {
			expect(() => parse({ city: '' })).toThrow()
			expect(() => parse({ city: '  ' })).toThrow()
			expect(() => parse({ city: locationInput.city })).not.toThrow()
		})

		test('countryCode', () => {
			expect(() => parse({ countryCode: '' })).toThrow()
			expect(() => parse({ countryCode: '  ' })).toThrow()
			expect(() => parse({ countryCode: 'D' })).toThrow()
			expect(() => parse({ countryCode: 'DEUTSCHLAND' })).toThrow()
			expect(() => parse({ countryCode: 'de' })).toThrow()
			expect(() => parse({ countryCode: locationInput.countryCode })).not.toThrow()
		})

		test('postalCode', () => {
			expect(() => parse({ postalCode: '' })).toThrow()
			expect(() => parse({ postalCode: '  ' })).toThrow()
			// expect(() => parse({ postalCode: 'ABCS' })).toThrow()
			expect(() => parse({ postalCode: locationInput.postalCode })).not.toThrow()
		})

		test('region', () => {
			expect(() => parse({ region: '' })).toThrow()
			expect(() => parse({ region: '  ' })).toThrow()
			expect(() => parse({ region: locationInput.region })).not.toThrow()
		})
	})
})
