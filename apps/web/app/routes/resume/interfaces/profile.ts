// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { UrlString } from './url-string.ts'

export const Profile = S.struct({
	network: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'network',
			description: 'The name of the social network',
			examples: ['Facebook', 'Twitter'],
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'The URL of the profile on the social network',
			examples: ['http://twitter.example.com/neutralthoughts'],
		}),
		{ exact: true },
	),

	username: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'username',
			description: 'The username of the profile on the social network',
			examples: ['neutralthoughts'],
		}),
		{ exact: true },
	),
})
export type Profile = S.Schema.Encoded<typeof Profile>
