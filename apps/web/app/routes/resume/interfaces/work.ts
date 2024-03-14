// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

import { Email } from './email.ts'
import { ISODateString } from './iso-date-string.ts'
import { Phone } from './phone.ts'
import { UrlString } from './url-string.ts'

export const Work = S.struct({
	description: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('description'),
			S.description('A short description of the company'),
			S.examples(['Social Media Company', 'Educational Software Company']),
		),
		{ exact: true },
	),

	endDate: S.optional(ISODateString, { exact: true }),

	highlights: S.optional(
		S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('highlights'),
			S.description('Specify multiple accomplishments'),
			S.examples([['Founded the company', 'Wrote a new algorithm']]),
		),
		{ exact: true },
	),

	location: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('location'),
			S.description('Location of the company'),
			S.examples(['Menlo Park, CA']),
		),
		{ exact: true },
	),

	name: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('name'),
			S.description('Name of the company'),
			S.examples(['Facebook']),
		),
		{ exact: true },
	),

	/**
	 * e.g. Software Engineer
	 */
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

	contact: S.optional(
		S.struct({
			name: S.string.pipe(
				S.trimmed(),
				S.nonEmpty(),
				S.title('name'),
				S.description('The name and role of the contact person'),
				S.examples(['Mark Zuckerberg (CTO)']),
			),

			email: S.optional(Email, { exact: true }),

			phone: S.optional(Phone, { exact: true }),
		}),
		{ exact: true },
	),
})

export interface Work extends S.Schema.Type<typeof Work> {}
