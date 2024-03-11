import * as S from '@effect/schema/Schema'

import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Education = S.struct({
	/**
	 * e.g. Arts
	 */
	area: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'area',
			description: 'e.g. Arts',
			examples: ['Arts'],
		},
	}),

	courses: S.optional(S.array(S.string), {
		exact: true,
		annotations: { title: 'courses', description: 'List notable courses/subjects' },
	}),

	endDate: S.optional(ISODateString, { exact: true }),

	gpa: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'gpa',
			description: 'grade point average, e.g. 3.67/4.0',
			examples: ['3.67/4.0'],
		},
	}),

	institution: S.optional(S.string, {
		annotations: {
			title: 'institution',
			description: 'e.g. Massachusetts Institute of Technology',
			examples: ['Massachusetts Institute of Technology'],
		},
	}),

	startDate: S.optional(ISODateString, { exact: true }),

	studyType: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'studyType',
			description: 'tuYpe of study',
			examples: ['Bachelor'],
		},
	}),

	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'URL (as per RFC 3986)',
			examples: ['http://facebook.example.com'],
		},
	}),

	location: S.optional(S.string, { exact: true }),
})

export interface Education extends S.Schema.To<typeof Education> {}
