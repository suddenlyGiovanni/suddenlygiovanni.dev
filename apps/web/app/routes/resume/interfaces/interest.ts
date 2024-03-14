// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Interest = S.struct({
	keywords: S.optional(S.array(S.string.pipe(S.trimmed(), S.nonEmpty())), {
		exact: true,
		annotations: {
			title: 'keywords',
			description: 'List some keywords pertaining to this interest',
			examples: ['philosophy', 'distributed systems'],
		},
	}),

	name: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		},
	}),
})

export interface Interest extends S.Schema.Type<typeof Interest> {}
