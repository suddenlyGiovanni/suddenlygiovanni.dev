import * as S from '@effect/schema/Schema'

export const Reference = S.struct({
	name: S.string.pipe(
		S.trimmed(),
		S.nonEmpty(),
		S.title('name'),
		S.description('The name of the reference'),
		S.examples(['Timothy Cook']),
	),

	reference: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('reference'),
			S.description('The reference text'),
			S.examples([
				'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
			]),
		),
		{ exact: true },
	),
})

export interface Reference extends S.Schema.To<typeof Reference> {}
