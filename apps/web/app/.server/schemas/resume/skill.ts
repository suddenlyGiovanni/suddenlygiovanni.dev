import * as S from '@effect/schema/Schema'

export const Skill = S.Struct({
	keywords: S.Array(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'keyword',
			examples: ['Rust'],
		}),
	).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
	}),

	level: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'level',
			description: 'Level of expertise',
			examples: ['Master', 'Intermediate'],
		}),
		{ exact: true },
	),

	name: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'name',
		description: 'Name of the skill',
		examples: ['Web Development'],
	}),
})

export type Skill = S.Schema.Encoded<typeof Skill>
export type SkillType = S.Schema.Type<typeof Skill>
