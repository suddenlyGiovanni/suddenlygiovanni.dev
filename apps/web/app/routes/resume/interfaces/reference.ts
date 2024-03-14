// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Reference = S.struct({
	name: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'name',
		description: 'The name of the reference',
		examples: ['Timothy Cook'],
	}),

	reference: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'reference',
			description: 'The reference text',
			examples: [
				'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
			],
		}),
		{ exact: true },
	),
})

export interface Reference extends S.Schema.Encoded<typeof Reference> {}
