// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { UrlString } from './url-string.ts'

export const Profile = S.struct({
	/**
	 * e.g. Facebook or Twitter
	 */
	network: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'network',
			description: 'The name of the social network',
			examples: ['Facebook', 'Twitter'],
		},
	}),

	/**
	 * e.g. http://twitter.example.com/neutralthoughts
	 */
	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'The URL of the profile on the social network',
			examples: ['http://twitter.example.com/neutralthoughts'],
		},
	}),
	/**
	 * e.g. neutralthoughts
	 */
	username: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'username',
			description: 'The username of the profile on the social network',
			examples: ['neutralthoughts'],
		},
	}),
})
export type Profile = S.Schema.To<typeof Profile>
