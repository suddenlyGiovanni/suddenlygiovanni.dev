// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Phone } from './phone.ts'

describe('Phone', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(Phone)

		const validPhoneNumbers = [
			{ phone: '+4907121172923', description: 'German number' },
			{ phone: '+441632960961', description: 'UK number' },
			{ phone: '+353861234567', description: 'Irish number' },
			{ phone: '00353861234567', description: 'Irish number with 00 prefix' },
			// { phone: '+39 02 1234567', description: 'Italian number with space' },
			// { phone: '+1-800-123-4567', description: 'US number with hyphen' },
			// Add more test cases as needed
		]

		const invalidPhoneNumbers = [
			{ phone: '', description: 'Empty' },
			{ phone: '  ', description: 'Whitespace' },
			{ phone: '+1234567890', description: 'Non-European number' },
			{ phone: '123456', description: 'Too short' },
			{ phone: 'abcdefghijk', description: 'Non-numeric characters' },

			// { phone: '+39021234567', description: 'Italian number without space' },
			{ phone: '+1 800 123 4567', description: 'US number with spaces' },
			// Add more test cases as needed
		]

		test.each(validPhoneNumbers)('parse valid phone number $phone ($description)', ({ phone }) => {
			expect(() => parse(phone)).not.toThrow()
		})

		test.each(invalidPhoneNumbers)(
			'throws for invalid number $phone ($description)',
			({ phone }) => {
				expect(() => parse(phone)).toThrow()
			},
		)
	})
})
