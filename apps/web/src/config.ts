type SocialNetwork = 'GitHub' | 'Twitter' | 'LinkedIn'
interface SocialProfile {
	readonly url: string
	readonly handle: string
}
type Socials = Record<SocialNetwork, SocialProfile>

export const config = {
	socials: {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		GitHub: {
			url: 'https://github.com/suddenlyGiovanni/',
			handle: 'suddenlyGiovanni',
		},
		// biome-ignore lint/style/useNamingConvention: <explanation>
		Twitter: {
			url: 'https://twitter.com/suddenlyGio/',
			handle: 'suddenlyGio',
		},
		// biome-ignore lint/style/useNamingConvention: <explanation>
		LinkedIn: {
			url: 'https://www.linkedin.com/in/giovanni-ravalico/',
			handle: 'giovanni-ravalico',
		},
	} as const satisfies Socials,
	siteUrl: 'https://www.suddenlygiovanni.dev',
	siteName: 'suddenlyGiovanni',
} as const
