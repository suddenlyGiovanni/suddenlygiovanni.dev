import * as S from '@effect/schema/Schema'
import { flow } from 'effect/Function'

// Function to convert the human-readable phone number into its E.164 format
function toE164(phone: string): string {
	// Replace '00' with '+' at the beginning
	const e164Phone = phone.startsWith('00') ? `+${phone.slice(2)}` : phone
	// Remove all non-digit characters except the '+' at the beginning
	return e164Phone.replace(/(?!^\+)\D/g, '')
}

// Function to validate the E.164 formatted number
function isValidE164(phone: string): boolean {
	// E.164 format: up to 15 digits, starting with '+'
	const e164Regex = /^\+[1-9]\d{1,14}$/
	return e164Regex.test(phone)
}

export const Phone = S.compose(
	// The phone number should be a non-empty string
	S.Trim,
	S.NonEmpty,
)
	.pipe(
		// Convert the phone number to E.164 format and validate it
		S.filter(flow(toE164, isValidE164), {
			message: ({ actual }) => `Invalid E.164 phone number: "${String(actual)}"`,
		}),
	)
	.annotations({
		title: 'Phone',
		description: 'Phone number that can be coveted to a valid E.164 format',
		examples: [
			'+4907121172923',
			'+441632960961',
			'+353861234567',
			'00353861234567',
			'+39 02 1234567',
			'+1-800-123-4567',
			'+1 800 123 4567',
			'+49 (0) 216 554 1036',
		],
	})
