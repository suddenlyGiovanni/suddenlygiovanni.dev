import * as S from '@effect/schema/Schema'

export const Skill = S.struct({
	keywords: S.optional(
		S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('keywords'),
			S.description('List some keywords pertaining to this skill'),
			S.examples(['Rust', 'Java']),
		),
		{ exact: true },
	),

	level: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('level'),
			S.description('Level of expertise'),
			S.examples(['Master', 'Intermediate']),
		),
		{ exact: true },
	),

	name: S.string.pipe(
		S.trimmed(),
		S.nonEmpty(),
		S.title('name'),
		S.description('Name of the skill'),
		S.examples(['Web Development']),
	),
})

export interface Skill extends S.Schema.To<typeof Skill> {}
