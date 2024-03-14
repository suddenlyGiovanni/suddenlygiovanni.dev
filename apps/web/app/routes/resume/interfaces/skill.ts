// biome-ignore lint/nursery/noNamespaceImport: this is how Schema is exported
import * as S from '@effect/schema/Schema'

export const Skill = S.struct({
	keywords: S.optional(
		S.array(S.compose(S.Trim, S.NonEmpty)).pipe(
			S.title('keywords'),
			S.description('List some keywords pertaining to this skill'),
			S.examples([['Rust', 'Java']]),
		),
		{ exact: true },
	),

	level: S.optional(
		S.compose(S.Trim, S.NonEmpty).pipe(
			S.title('level'),
			S.description('Level of expertise'),
			S.examples(['Master', 'Intermediate']),
		),
		{ exact: true },
	),

	name: S.compose(S.Trim, S.NonEmpty).pipe(
		S.title('name'),
		S.description('Name of the skill'),
		S.examples(['Web Development']),
	),
})

export type Skill = S.Schema.Encoded<typeof Skill>
