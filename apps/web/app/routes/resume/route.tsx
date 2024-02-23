import type { LinksFunction, MetaFunction } from '@remix-run/node'
import resume from '@suddenly-giovanni/resume'
import { T } from '@suddenly-giovanni/ui'
import { Education } from '~/routes/resume/education.tsx'
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
	const { basics, skills, work, education } = mapToResume(resume)

	return (
		<article>
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

			<T.code>
				<pre>{JSON.stringify(resume, null, 2)}</pre>
			</T.code>
		</article>
	)
}
