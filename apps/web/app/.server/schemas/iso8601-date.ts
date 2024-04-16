import * as ParseResult from '@effect/schema/ParseResult'
import * as S from '@effect/schema/Schema'

/**
 * A string ISO 8601 date Schema.
 * Given any string date, it validates it to be a valid input for the Date constructor,
 * and then it converts it to a string in the ISO 8601 format.
 */
export const ISO8601Date = S.transformOrFail(S.Date, S.String, {
	decode: date => ParseResult.succeed(date.toISOString()),
	encode: (maybeIsoStringDate, _, ast) =>
		Number.isNaN(Date.parse(maybeIsoStringDate))
			? ParseResult.fail(
					new ParseResult.Type(ast, maybeIsoStringDate, `Invalid date: ${maybeIsoStringDate}`),
				)
			: ParseResult.succeed(new Date(maybeIsoStringDate)),
	strict: true,
})
