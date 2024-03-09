import { Icons, SocialIcon, T } from '@suddenly-giovanni/ui/components'
import { cn } from '@suddenly-giovanni/ui/lib'
import type { ReactElement } from 'react'

interface Location {
	/**
	 * To add multiple address lines, use
	 * . For example, 1234 Glücklichkeit Straße
	 * Hinterhaus 5. Etage li.
	 */
	address: string
	city: string
	/**
	 * code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN
	 */
	countryCode: string
	postalCode: string
	/**
	 * The general region where you live. Can be a US state, or a province, for instance.
	 */
	region: string
}

interface Basics {
	/**
	 * e.g. thomas@gmail.com
	 */
	email: string
	/**
	 * URL (as per RFC 3986) to a image in JPEG or PNG format
	 */
	image: string
	/**
	 * e.g. Web Developer
	 */
	label: string
	location: Location
	name: string
	/**
	 * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
	 */
	phone: string
	/**
	 * Specify any number of social networks that you participate in
	 */
	profiles: Profile[]
	/**
	 * Write a short 2-3 sentence biography about yourself
	 */
	summary: string
	/**
	 * URL (as per RFC 3986) to your website, e.g. personal homepage
	 */
	url: string
}

interface Profile {
	/**
	 * e.g. Facebook or Twitter
	 */
	network: string
	/**
	 * e.g. http://twitter.example.com/neutralthoughts
	 */
	url: string
	/**
	 * e.g. neutralthoughts
	 */
	username: string
}

const addressClasses = {
	address: cn(
		[
			'mx-auto',
			'my-1',
			'p-4',
			'w-auto',
			'max-w-max',
			'rounded-md',
			'bg-card-foreground/5',
			'backdrop-blur-3xl',
			'shadow-lg',
			'ring-1',
			'rounded-xl',
			'ring-black/5',
		],
		['md:w-full', 'md:max-w-none', 'md:px-0', 'md:px-24'],
	),
	ul: cn(
		'my-0 pl-0',
		['ml-0', 'grid', 'grid-cols-1'],
		['md:grid-cols-2', 'md:grid-flow-row-dense', 'md:justify-items-start'],
	),
	li: cn(
		'flex',
		'flex-row',
		'items-center',
		'gap-3',
		'text-start',
		'max-w-72',
		'mx-auto',
		'w-full',
	),
}

export function Contacts({
	email,
	location,
	phone,
	profiles,
	url,
}: Pick<Basics, 'email' | 'location' | 'phone' | 'profiles' | 'url'>): ReactElement {
	return (
		<address className={addressClasses.address}>
			<T.ul className={addressClasses.ul}>
				<li className={addressClasses.li}>
					<Icons.globe aria-label="location icon" className="size-4" />
					<T.a
						href="https://www.openstreetmap.org/search?query=berlin#map=11/52.5072/13.4249"
						target="_blank"
						rel="noreferrer"
					>{`${location.city}, ${location.countryCode}`}</T.a>
				</li>

				<li className={addressClasses.li}>
					<Icons.envelope aria-label="mail icon" />
					<T.a aria-label="email" href={`mailto:${email}`} rel="noreferrer" target="_blank">
						{email}
					</T.a>
				</li>

				<li className={addressClasses.li}>
					<Icons.desktop aria-label="mail icon" />
					<T.a aria-label="link to my website" href={url} rel="noreferrer" target="_blank">
						{url}
					</T.a>
				</li>

				<li className={addressClasses.li}>
					<Icons.mobile aria-label="phone icon" />
					<T.a aria-label="phone number" href={`tel:${phone || ''}`}>
						{phone}
					</T.a>
				</li>
				{profiles.map((profile, idx) => (
					<li className={addressClasses.li} key={String(idx) + String(profile.network)}>
						<SocialIcon
							aria-label={`${profile.network || ''} icon`}
							network={profile.network.toLowerCase()}
						/>

						<T.a aria-label={`link to ${profile.network || ''}`} href={profile.url}>
							{profile.url.replace(/(https:\/\/www\.)|(https:\/\/)/i, '')}
						</T.a>
					</li>
				))}
			</T.ul>
		</address>
	)
}
