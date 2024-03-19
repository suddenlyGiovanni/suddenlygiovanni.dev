import type { ParseError } from '@effect/schema/ParseResult'
import { transform, string, Date as $Date, decodeEither } from '@effect/schema/Schema'
import type { Either } from 'effect/Either'
import { pipe } from 'effect/Function'

/**
 * Given a string date, this function validates and transforms it to a US locale short date format.
 *
 * @param isoString - The input string date in ISO format.
 * @returns Either the formatted US locale short date or a parse error.
 */
export function formatDateLocaleShort(isoString: string): Either<string, ParseError> {
	return pipe(
		$Date
			.pipe(
				transform(
					string,
					fromDate => fromDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
					fromLocaleDateString => new Date(fromLocaleDateString),
				),
			)
			.annotations({
				title: 'localDate',
				description: 'a short US locale date format',
				examples: ['Apr 2022'],
			}),
		decodeEither,
	)(isoString)
}
