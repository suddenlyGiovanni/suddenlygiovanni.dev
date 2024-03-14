// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Education = S.struct({
	/**
	 * e.g. Arts
	 */
	area: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
	}).annotations({
		title: 'area',
		description: 'e.g. Arts',
		examples: ['Arts', 'Computer Science'],
	}),

	courses: S.optional(S.array(S.string.pipe(S.trimmed(), S.nonEmpty())), {
		exact: true,
	}).annotations({ title: 'courses', description: 'List notable courses/subjects' }),

	endDate: S.optional(ISODateString, { exact: true }),

	gpa: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
	}).annotations({
		title: 'gpa',
		description: 'grade point average, e.g. 3.67/4.0',
		examples: ['3.67/4.0'],
	}),

	institution: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {}).annotations({
		title: 'institution',
		description: 'e.g. Massachusetts Institute of Technology',
		examples: ['Massachusetts Institute of Technology'],
	}),

	startDate: S.optional(ISODateString, { exact: true }),

	studyType: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
	}).annotations({
		title: 'studyType',
		description: 'the type of study',
		examples: ['Bachelor', 'Master', 'Doctorate'],
	}),

	url: S.optional(UrlString, {
		exact: true,
	}).annotations({
		title: 'url',
		description: 'URL (as per RFC 3986)',
		examples: ['http://facebook.example.com'],
	}),

	location: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), { exact: true }),
})

export interface Education extends S.Schema.Type<typeof Education> {}
