import type { LinksFunction, MetaFunction } from '@remix-run/node'
import resume from '@suddenly-giovanni/resume'
import { T } from '@suddenly-giovanni/ui'
import { Contacts } from '~/routes/resume/contacts.tsx'
import { Experience } from '~/routes/resume/experience.tsx'
import { Header } from '~/routes/resume/header.tsx'
import { mapToResume } from '~/routes/resume/mapper.ts'
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
	const { basics, skills, work } = mapToResume(resume)

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

			<Experience works={work} />

			<T.code>
				<pre>{JSON.stringify(resume, null, 2)}</pre>
			</T.code>
		</article>
	)
}
