import type { ParseError } from '@effect/schema/ParseResult'
import * as Schema from '@effect/schema/Schema'
import type { Either } from 'effect/Either'

/**
 * Given a string date, this function validates and transforms it to a US locale short date format.
 *
 * @param isoString - The input string date in ISO format.
 * @returns Either the formatted US locale short date or a parse error.
 */
export function formatDateLocaleShort(isoString: string): Either<string, ParseError> {
	const schema = Schema.transform(Schema.Date, Schema.String, {
		decode: fromDate => fromDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
		encode: fromLocaleDateString => new Date(fromLocaleDateString),
	}).annotations({
		title: 'localDate',
		description: 'a short US locale date format',
		examples: ['Apr 2022'],
	})
	return Schema.decodeEither(schema)(isoString)
}
