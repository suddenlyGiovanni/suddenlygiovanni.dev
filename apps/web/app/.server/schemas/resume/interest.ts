import * as S from '@effect/schema/Schema'

export const Interest = S.Struct({
	keywords: S.optional(
		S.Array(
			S.compose(S.Trim, S.NonEmpty).annotations({
				title: 'keyword',
				examples: ['philosophy'],
			}),
		).annotations({
			title: 'keywords',
			description: 'List some keywords pertaining to this interest',
			examples: [['philosophy', 'distributed systems']],
		}),
		{ exact: true },
	),

	name: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		}),
		{ exact: true },
	),
})

export type Interest = S.Schema.Encoded<typeof Interest>
