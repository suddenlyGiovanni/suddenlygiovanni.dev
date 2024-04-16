import * as S from '@effect/schema/Schema'

export const UrlString: S.Schema<string> = S.compose(S.Trim, S.NonEmpty).pipe(
	S.filter(value => {
		try {
			new URL(value)
			return true
		} catch (_) {
			return false
		}
	}),
	S.description('URL (as per RFC 3986)'),
	S.examples(['https://facebook.example.com']),
)
