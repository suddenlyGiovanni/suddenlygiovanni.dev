// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Language = S.struct({
	fluency: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
	}).annotations({
		title: 'fluency',
		description: 'e.g. Fluent, Beginner',
		examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
	}),
	language: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
	}).annotations({
		title: 'language',
		description: 'e.g. English, Spanish',
		examples: ['English', 'Spanish'],
	}),
})

export interface Language extends S.Schema.Type<typeof Language> {}
