// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Interest = S.struct({
	keywords: S.optional(
		S.array(
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

export interface Interest extends S.Schema.Encoded<typeof Interest> {}
