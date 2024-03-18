// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { ISO8601Date } from './iso8601-date.ts'
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

	endDate: S.optional(
		ISO8601Date.annotations({
			title: 'endDate',
			description: 'end date of education',
			examples: ['2020-01-01'],
		}),
		{ exact: true },
	),

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

	startDate: S.optional(
		ISO8601Date.annotations({
			title: 'startDate',
			description: 'start date of education',
			examples: ['1970-01-01T00:00'],
		}),
		{ exact: true },
	),

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
}).pipe(
	S.filter(
		education => {
			if (!education.startDate) return true
			// short-circuit if there is no end date
			if (!education.endDate) return true
			// check if the start date is before the end date
			return new Date(education.startDate) < new Date(education.endDate)
		},
		{ message: () => 'The start date must be before the end date' },
	),
)

export type Education = S.Schema.Encoded<typeof Education>
export type EducationType = S.Schema.Type<typeof Education>
