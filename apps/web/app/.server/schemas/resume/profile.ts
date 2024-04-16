import * as S from '@effect/schema/Schema'

import { UrlString } from '../url-string.ts'

export const Profile = S.struct({
	network: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'network',
		description: 'The name of the social network',
		examples: ['Facebook', 'Twitter'],
	}),

	url: UrlString.annotations({
		title: 'url',
		description: 'The URL of the profile on the social network',
		examples: ['http://twitter.example.com/neutralthoughts'],
	}),

	username: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'username',
		description: 'The username of the profile on the social network',
		examples: ['neutralthoughts'],
	}),
})
export type Profile = S.Schema.Encoded<typeof Profile>
