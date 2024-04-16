import * as S from '@effect/schema/Schema'

export const Language = S.Struct({
	fluency: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'fluency',
			description: 'e.g. Fluent, Beginner',
			examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		}),
		{ exact: true },
	),

	language: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'language',
			description: 'e.g. English, Spanish',
			examples: ['English', 'Spanish'],
		}),
		{ exact: true },
	),
})

export type Language = S.Schema.Encoded<typeof Language>
