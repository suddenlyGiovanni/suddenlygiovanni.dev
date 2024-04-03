// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

/**
 * A string ISO 8601 date Schema.
 * Given any string date, it validates it to be a valid input for the Date constructor,
 * and then it converts it to a string in the ISO 8601 format.
 */
export const ISO8601Date: S.Schema<string> = S.Date.pipe(
	S.transform(
		S.string,
		fromDate => fromDate.toISOString(),
		fromISOString => new Date(fromISOString),
	),
)
