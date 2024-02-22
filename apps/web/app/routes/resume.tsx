import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { cn, T, Icons, SocialIcon } from '@suddenly-giovanni/ui'
import resume from '@suddenly-giovanni/resume'
import resumePdfAssetUrl from '../../public/giovanni-ravalico-resume-2021.pdf?url'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Résumé' },
		{
			name: 'description',
			content:
				"Giovanni Ravalico's Résumé. A place where I showcase my professional experience and skills.",
		},
	]
}

const addressClasses = {
	address: cn('my-1', 'bg-slate-500/15', 'py-1'),
	ul: cn(
		'mx-auto',
		'flex',
		'max-h-32',
		'flex-col',
		'flex-wrap',
		'content-evenly',
		'items-start',
		'justify-start',
	),
	li: cn('flex', 'flex-row', 'items-center', 'justify-start', 'gap-3'),
}

export default function Blog(): JSX.Element {
	const { basics } = resume

	return (
		<article>
			<header>
				<hgroup>
					<T.h1>{basics.name}</T.h1>
					<T.h2>{basics.label}</T.h2>
				</hgroup>
				<T.p>{basics.summary}</T.p>
				<T.p>
					<em>
						If you consider me for a role, read through{' '}
						<Link
							className={cn(
								'font-medium',
								'text-primary',
								'underline',
								'underline-offset-4',
							)}
							to="/motivations"
						>
							{' '}
							my motivations
						</Link>{' '}
						first.
					</em>
				</T.p>

				<address className={addressClasses.address}>
					<T.ul className={addressClasses.ul}>
						<li className={addressClasses.li}>
							<Icons.globe
								aria-label="location icon"
								className="size-4"
							/>
							<T.a
								href="https://www.openstreetmap.org/search?query=berlin#map=11/52.5072/13.4249"
								target="_blank"
							>{`${basics.location.city}, ${basics.location.countryCode}`}</T.a>
						</li>

						<li className={addressClasses.li}>
							<Icons.envelope aria-label="mail icon" />
							<T.a
								aria-label="email"
								href={`mailto:${basics.email}`}
								rel="noreferrer"
								target="_blank"
							>
								{basics.email}
							</T.a>
						</li>

						<li className={addressClasses.li}>
							<Icons.desktop aria-label="mail icon" />
							<T.a
								aria-label="link to my website"
								href={basics.url}
								rel="noreferrer"
								target="_blank"
							>
								{basics.url}
							</T.a>
						</li>

						<li className={addressClasses.li}>
							<Icons.mobile aria-label="phone icon" />
							<T.a
								aria-label="phone number"
								href={`tel:${basics.phone || ''}`}
							>
								{basics.phone}
							</T.a>
						</li>
						{basics.profiles.map((profile, idx) => (
							<li
								className={addressClasses.li}
								key={String(idx) + String(profile.network)}
							>
								<SocialIcon
									aria-label={`${profile.network || ''} icon`}
									network={profile.network.toLowerCase()}
								/>

								<T.a
									aria-label={`link to ${profile.network || ''}`}
									href={profile.url}
								>
									{profile.url.replace(/(https:\/\/www\.)|(https:\/\/)/i, '')}
								</T.a>
							</li>
						))}
					</T.ul>
				</address>

				<T.p>
					click on this link to download the pdf version of my resume{' '}
					<span
						aria-label="pdf"
						role="img"
					>
						📜
					</span>{' '}
					<T.a
						download
						href={resumePdfAssetUrl}
						rel="noopener"
						target="_blank"
					>
						giovanni-ravalico-resume.pdf
					</T.a>
				</T.p>
			</header>
			<T.code>
				<pre>{JSON.stringify(resume, null, 2)}</pre>
			</T.code>
		</article>
	)
}
