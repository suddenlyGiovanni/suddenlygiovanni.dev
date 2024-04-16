import * as S from '@effect/schema/Schema'

export const Award = S.Struct({
	awarder: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'awarder',
			description: 'The name of the award given',
			examples: ['Time Magazine'],
		}),
		{ exact: true },
	),

	date: S.optional(
		S.Date.annotations({
			title: 'date',
			description: 'Date of the award',
			examples: [new Date('1970-01-01T00:00:00.000Z')],
		}),
		{ exact: true },
	),

	summary: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'summary',
			description: 'A brief summary of the award',
			examples: ['Received for my work with Quantum Physics'],
		}),
		{ exact: true },
	),

	title: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'title',
			description: 'Title of the award',
			examples: ['One of the 100 greatest minds of the century'],
		}),
		{ exact: true },
	),
})

export type Award = S.Schema.Encoded<typeof Award>
