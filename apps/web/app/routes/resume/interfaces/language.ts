// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Language = S.struct({
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

export interface Language extends S.Schema.Encoded<typeof Language> {}
