import type { ParseError } from '@effect/schema/ParseResult'
import * as Schema from '@effect/schema/Schema'
import type { Either } from 'effect/Either'

export function formatDateLocaleShort(isoString: string): Either<string, ParseError> {
	// TODO: missing tsdocs; starting from a string date, validate it to be valid date, then transform it to a us locale short date
	const localDateSchema: Schema.Schema<string> = Schema.Date.pipe(
		Schema.transform(
			Schema.string,
			fromDate => fromDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
			fromLocaleDateString => new Date(fromLocaleDateString),
		),
	).annotations({
		title: 'localDate',
		description: 'a short US locale date format',
		examples: ['Apr 2022'],
	})
	const parse = Schema.decodeEither(localDateSchema)
	return parse(isoString)
}
