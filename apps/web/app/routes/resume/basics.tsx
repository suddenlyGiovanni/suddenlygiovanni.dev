import { Link } from '@remix-run/react'
import { Icons } from '@suddenly-giovanni/ui/components/icons/icons.tsx'
import { SocialIcon } from '@suddenly-giovanni/ui/components/social/social-icon.tsx'
import { T } from '@suddenly-giovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'
import type { ReactElement, ReactNode } from 'react'
import { routesRecord } from '~/routes-record.ts'
import type { BasicsType } from '~/routes/resume/server.schema/basics.ts'
import type { ResumeType } from '~/routes/resume/server.schema/resume.ts'
import resumePdfAssetUrl from '/giovanni-ravalico-resume-2021.pdf?url'

export function Basics({ basics }: { basics: ResumeType['basics'] }): ReactElement {
	return (
		<Header label={basics.label} name={basics.name} summary={basics.summary}>
			<Contacts
				email={basics.email}
				location={basics.location}
				phone={basics.phone}
				profiles={basics.profiles}
				url={basics.url}
			/>
		</Header>
	)
}

function Header({
	name,
	label,
	children,
	summary,
}: Pick<BasicsType, 'name' | 'label' | 'summary'> & { children: ReactNode }): ReactElement {
	return (
		<header>
			<hgroup>
				<T.h1>{name}</T.h1>
				<T.h2>{label}</T.h2>
			</hgroup>
			<T.blockquote>{summary}</T.blockquote>
			<T.p>
				<em>
					If you consider me for a role, read through{' '}
					<Link
						className={clsx('font-medium', 'text-primary', 'underline', 'underline-offset-4')}
						to={routesRecord.motivations.url}
					>
						my motivations
					</Link>{' '}
					first.
				</em>
			</T.p>
			{children}
			<T.muted>
				click on this link to download the pdf version of my resume{' '}
				<span aria-label="pdf" role="img">
					📜
				</span>{' '}
				<T.a download href={resumePdfAssetUrl} rel="noopener">
					giovanni-ravalico-resume.pdf
				</T.a>
			</T.muted>
		</header>
	)
}

const addressClasses = {
	address: clsx(
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
	ul: clsx(
		'my-0 pl-0',
		['ml-0', 'grid', 'grid-cols-1'],
		['md:grid-cols-2', 'md:grid-flow-row-dense', 'md:justify-items-start'],
	),
	li: clsx(
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

interface ContactsProps {
	readonly email: BasicsType['email']
	readonly location: BasicsType['location']
	readonly phone: BasicsType['phone']
	readonly profiles: BasicsType['profiles']
	readonly url: BasicsType['url']
}

function Contacts({ email, location, phone, profiles, url }: ContactsProps): ReactElement {
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
					<T.a aria-label="phone number" href={`tel:${phone ?? ''}`}>
						{phone}
					</T.a>
				</li>
				{profiles.map(profile => (
					<li className={addressClasses.li} key={profile.network}>
						<SocialIcon
							aria-label={`${profile.network} icon`}
							network={profile.network.toLowerCase()}
						/>

						<T.a aria-label={`link to ${profile.network}`} href={profile.url}>
							{profile.url.replace(/(?:https:\/\/www\.)|(?:https:\/\/)/i, '')}
						</T.a>
					</li>
				))}
			</T.ul>
		</address>
	)
}
