import { Icons } from '@repo/ui/components/icons/icons.tsx'
import { SocialIcon } from '@repo/ui/components/social/social-icon.tsx'
import { T } from '@repo/ui/components/typography/typography.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import type * as Model from '@suddenly-giovanni/schema-resume'
import { Hash } from 'effect'
import type { ReactElement, ReactNode } from 'react'
import { Link } from 'react-router'

import { routesRecord } from '#root/src/routes-record.ts'

import resumePdfAssetUrl from '/giovanni-ravalico-resume-2021.pdf?url'

export function Basics({ basics }: { basics: Model.Basics }): ReactElement {
	return (
		<Header
			label={basics.label}
			name={basics.name}
			summary={basics.summary}
		>
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
}: Pick<Model.Basics, 'name' | 'label' | 'summary'> & { children: ReactNode }): ReactElement {
	return (
		<header>
			<hgroup>
				<T.h1>{name}</T.h1>
				<T.h2>{label}</T.h2>
			</hgroup>
			<T.blockquote>
				{summary.split('\n').map(p => (
					<p
						className="my-0"
						key={Hash.hash(p)}
					>
						{p}
					</p>
				))}
			</T.blockquote>
			<T.p>
				<em>
					If you consider me for a role, read through{' '}
					<Link
						className={clsx('font-medium text-primary underline underline-offset-4')}
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
				<span
					aria-label="pdf"
					role="img"
				>
					📜
				</span>{' '}
				<T.a
					download={true}
					href={resumePdfAssetUrl}
					rel="noopener"
				>
					giovanni-ravalico-resume.pdf
				</T.a>
			</T.muted>
		</header>
	)
}

const addressClasses = {
	address: clsx(
		'mx-auto my-1 w-auto max-w-max rounded-md rounded-xl bg-card-foreground/5 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-3xl md:w-full md:max-w-none md:px-0 md:px-24',
	),
	li: clsx('mx-auto flex w-full max-w-72 flex-row items-center gap-3 text-start'),
	ul: clsx(
		'my-0 ml-0 grid grid-cols-1 pl-0 md:grid-flow-row-dense md:grid-cols-2 md:justify-items-start',
	),
}

interface ContactsProps {
	readonly email: Model.Basics['email']
	readonly location: Model.Basics['location']
	readonly phone: Model.Basics['phone']
	readonly profiles: Model.Basics['profiles']
	readonly url: Model.Basics['url']
}

const httpsUrlPattern: RegExp = /(?:https:\/\/www\.)|(?:https:\/\/)/i

function Contacts({ email, location, phone, profiles, url }: ContactsProps): ReactElement {
	return (
		<address className={addressClasses.address}>
			<T.ul className={addressClasses.ul}>
				<li className={addressClasses.li}>
					<Icons.globe
						aria-label="location icon"
						className="size-4"
					/>
					<T.a
						href="https://www.openstreetmap.org/search?query=berlin#map=11/52.5072/13.4249"
						rel="noreferrer"
						target="_blank"
					>{`${location.city}, ${location.countryCode}`}</T.a>
				</li>

				<li className={addressClasses.li}>
					<Icons.envelope aria-label="mail icon" />
					<T.a
						aria-label="email"
						href={`mailto:${email}`}
						rel="noreferrer"
						target="_blank"
					>
						{email}
					</T.a>
				</li>

				<li className={addressClasses.li}>
					<Icons.desktop aria-label="mail icon" />
					<T.a
						aria-label="link to my website"
						href={url}
						rel="noreferrer"
						target="_blank"
					>
						{url}
					</T.a>
				</li>

				<li className={addressClasses.li}>
					<Icons.mobile aria-label="phone icon" />
					<T.a
						aria-label="phone number"
						href={`tel:${phone ?? ''}`}
					>
						{phone}
					</T.a>
				</li>
				{profiles.map(profile => (
					<li
						className={addressClasses.li}
						key={profile.network}
					>
						<SocialIcon
							aria-label={`${profile.network} icon`}
							className={clsx('size-5 fill-foreground')}
							network={profile.network.toLowerCase()}
						/>

						<T.a
							aria-label={`link to ${profile.network}`}
							href={profile.url}
						>
							{profile.url.replace(httpsUrlPattern, '')}
						</T.a>
					</li>
				))}
			</T.ul>
		</address>
	)
}
