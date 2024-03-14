// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Email = S.compose(S.Trim, S.NonEmpty)
	.pipe(S.pattern(/^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i))
	.annotations({
		title: 'email',
		description: 'Email address',
		examples: ['foop@bar.baz'],
	})
