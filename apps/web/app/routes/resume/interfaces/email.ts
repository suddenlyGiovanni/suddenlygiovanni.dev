import * as S from '@effect/schema/Schema'

export const Email = S.string.pipe(
	S.pattern(/^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i, {
		title: 'email',
		description: 'Email address',
		examples: ['foop@bar.baz'],
	}),
)