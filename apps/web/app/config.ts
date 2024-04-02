type SocialNetwork = 'GitHub' | 'Twitter' | 'LinkedIn'
interface SocialProfile {
	readonly url: string
	readonly handle: string
}
type Socials = Record<SocialNetwork, SocialProfile>

export const config = {
	socials: {
		GitHub: {
			url: 'https://github.com/suddenlyGiovanni/',
			handle: 'suddenlyGiovanni',
		},
		Twitter: {
			url: 'https://twitter.com/suddenlyGio/',
			handle: 'suddenlyGio',
		},
		LinkedIn: {
			url: 'https://www.linkedin.com/in/giovanni-ravalico/',
			handle: 'giovanni-ravalico',
		},
	} as const satisfies Socials,
	siteUrl: 'https://www.suddenlygiovanni.dev',
	siteName:	'suddenlyGiovanni'
} as const
