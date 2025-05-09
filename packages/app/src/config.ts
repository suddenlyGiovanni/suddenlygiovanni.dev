type SocialNetwork = 'GitHub' | 'Twitter' | 'LinkedIn'
interface SocialProfile {
	readonly url: string
	readonly handle: string
}
type Socials = Record<SocialNetwork, SocialProfile>

export const config = {
	siteName: 'suddenlyGiovanni',
	siteUrl: 'https://www.suddenlygiovanni.dev',
	socials: {
		GitHub: {
			handle: 'suddenlyGiovanni',
			url: 'https://github.com/suddenlyGiovanni/',
		},

		LinkedIn: {
			handle: 'giovanni-ravalico',
			url: 'https://www.linkedin.com/in/giovanni-ravalico/',
		},

		Twitter: {
			handle: 'suddenlyGio',
			url: 'https://twitter.com/suddenlyGio/',
		},
	} as const satisfies Socials,
} as const
