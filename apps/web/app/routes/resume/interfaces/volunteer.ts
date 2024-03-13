// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Volunteer = S.struct({
	endDate: S.optional(ISODateString, { exact: true }),

	highlights: S.optional(
		S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('highlights'),
			S.description('Specify accomplishments and achievements'),
			S.examples(['Saved the world']),
		),
		{ exact: true },
	),

	organization: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('organization'),
			S.description('Organization'),
			S.examples(['Facebook']),
		),
		{ exact: true },
	),

	position: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('position'),
			S.description('The title of your position at the company'),
			S.examples(['Software Engineer']),
		),
		{ exact: true },
	),

	startDate: S.optional(ISODateString, { exact: true }),

	summary: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('summary'),
			S.description('Give an overview of your responsibilities at the company'),
			S.examples(['My day-to-day activities involved designing and building web applications...']),
		),
		{ exact: true },
	),

	url: S.optional(
		UrlString.pipe(
			S.title('url'),
			S.description('URL (as per RFC 3986) of the company'),
			S.examples(['https://facebook.example.com']),
		),
		{ exact: true },
	),
})

export interface Volunteer extends S.Schema.To<typeof Volunteer> {}
