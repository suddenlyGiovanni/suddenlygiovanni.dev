// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { UrlString } from './url-string.ts'

export const Education = S.struct({
	area: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'area',
			description: 'e.g. Arts',
			examples: ['Arts', 'Computer Science'],
		}),
		{
			exact: true,
		},
	),

	courses: S.optional(
		S.array(
			S.compose(S.Trim, S.NonEmpty).annotations({
				title: 'course',
				examples: ['H1302 - Introduction to American history'],
			}),
		).annotations({
			title: 'courses',
			description: 'List notable courses/subjects',
			examples: [['course1', 'course2']],
		}),
		{ exact: true },
	),

	endDate: S.optional(S.Date, { exact: true }),

	score: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'score',
			description: 'grade point average, e.g. 3.67/4.0',
			examples: ['3.67/4.0'],
		}),
		{
			exact: true,
		},
	),

	institution: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'institution',
			description: 'name of the institution',
			examples: ['Massachusetts Institute of Technology'],
		}),
		{ exact: true },
	),

	location: S.optional(S.compose(S.Trim, S.NonEmpty), { exact: true }),

	startDate: S.optional(S.Date, { exact: true }),

	studyType: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'studyType',
			description: 'the type of study',
			examples: ['Bachelor', 'Master', 'Doctorate'],
		}),
		{
			exact: true,
		},
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986)',
			examples: ['http://facebook.example.com'],
		}),
		{
			exact: true,
		},
	),
})

export interface Education extends S.Schema.Encoded<typeof Education> {}
