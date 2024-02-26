import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import resume from '@suddenly-giovanni/resume'
import { Separator, T } from '@suddenly-giovanni/ui'
import { Education } from './education.tsx'
import { Interests } from './interests.tsx'
import { Languages } from './languages.tsx'
import { Header } from './header.tsx'
import { mapToResume } from './mapper.ts'
import { Contacts } from './contacts.tsx'
import { Experiences } from './experiences.tsx'
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
	const { basics, skills, work, education, interests, languages } = mapToResume(resume)

	return (
		<article className="prose flex w-full max-w-none flex-col items-center justify-start gap-y-8 dark:prose-invert">
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

			<Skills skills={skills} />

			<Experiences works={work} />

			<Education educations={education} />

			<Interests interests={interests} />

			<Languages languages={languages} />

			<footer className="flex w-full items-center justify-between">
				<Link
					className="inline-block"
					to="/"
				>
					&larr; back to my About Me
				</Link>
			</footer>
		</article>
	)
}
