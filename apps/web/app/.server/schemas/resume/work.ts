import * as S from '@effect/schema/Schema'

import { ISO8601Date } from '../iso8601-date.ts'
import { UrlString } from '../url-string.ts'
import { Email } from './email.ts'
import { Phone } from './phone.ts'

export const Work = S.Struct({
	contact: S.optional(
		S.Struct({
			name: S.compose(S.Trim, S.NonEmpty).annotations({
				title: 'name',
				description: 'The name and role of the contact person',
				examples: ['Mark Zuckerberg (CTO)'],
			}),

			email: Email,

			phone: S.optional(Phone, { exact: true }),
		}),
		{ exact: true },
	),

	description: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'description',
		description: 'A short description of the company',
		examples: ['Social Media Company', 'Educational Software Company'],
	}),

	endDate: S.optional(
		ISO8601Date.annotations({
			title: 'endDate',
			description: 'The date when you stopped working at the company',
			examples: ['2012-01-01'],
		}),
		{ exact: true },
	),

	highlights: S.Array(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'highlight',
			description: 'A specific accomplishment',
			examples: ['Increased profits by 20% from 2011-2012 through viral advertising'],
		}),
	).annotations({
		title: 'highlights',
		description: 'Specify multiple accomplishments',
	}),

	location: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'location',
			description: 'Location of the company',
			examples: ['Menlo Park, CA'],
		}),
		{ exact: true },
	),

	name: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'name',
		description: 'Name of the company',
		examples: ['Facebook'],
	}),

	/**
	 * e.g. Software Engineer
	 */
	position: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'position',
		description: 'The title of your position at the company',
		examples: ['Software Engineer'],
	}),

	startDate: ISO8601Date.annotations({
		title: 'startDate',
		description: 'The date when you started working at the company',
		examples: ['2011-01-01'],
	}),

	summary: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'summary',
			description: 'Give an overview of your responsibilities at the company',
			examples: ['My day-to-day activities involved designing and building web applications...'],
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) of the company',
			examples: ['https://facebook.example.com'],
		}),
		{ exact: true },
	),
}).pipe(
	S.filter(
		work => {
			// short-circuit if there is no end date
			if (!work.endDate) return true
			// check if the start date is before the end date
			return new Date(work.startDate) < new Date(work.endDate)
		},
		{ message: () => 'The start date must be before the end date' },
	),
)

export type Work = S.Schema.Encoded<typeof Work>
export type WorkType = S.Schema.Type<typeof Work>
