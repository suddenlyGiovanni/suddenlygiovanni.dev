import { Schema } from 'effect'
import type { Either } from 'effect/Either'
import type { ParseError } from 'effect/ParseResult'

/**
 * Given a string date, this function validates and transforms it to a US locale short date format.
 *
 * @param isoString - The input string date in ISO format.
 * @returns Either the formatted US locale short date or a parse error.
 */
export function formatDateLocaleShort(isoString: string): Either<string, ParseError> {
	const schema = Schema.transform(Schema.Date, Schema.String, {
		decode(fromDate): string {
			return fromDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
		},
		encode(fromLocaleDateString): Date {
			return new Date(fromLocaleDateString)
		},
	}).annotations({
		title: 'localDate',
		description: 'a short US locale date format',
		examples: ['Apr 2022'],
	})
	return Schema.decodeEither(schema)(isoString)
}
