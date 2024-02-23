import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import resume from '@suddenly-giovanni/resume'
import { cn, T } from '@suddenly-giovanni/ui'
import resumePdfAssetUrl from 'public/giovanni-ravalico-resume-2021.pdf?url'
import { Contacts } from '~/routes/resume/contacts.tsx'
import { Skills } from './skills.tsx'

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

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			type: 'text/css',
			href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
		},
	]
}

export default function Resume(): JSX.Element {
	const { basics, skills } = resume

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

				<Contacts
					email={basics.email}
					location={basics.location}
					phone={basics.phone}
					profiles={basics.profiles}
					url={basics.url}
				/>

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

			<Skills skills={skills} />

			<T.code>
				<pre>{JSON.stringify(resume, null, 2)}</pre>
			</T.code>
		</article>
	)
}
