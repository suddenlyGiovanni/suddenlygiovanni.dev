import {
	type LinksFunction,
	type MetaFunction,
	type LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import resumeAssetUrl from '@suddenly-giovanni/resume'
import { cn } from '@suddenly-giovanni/ui'
import type { ReactElement } from 'react'
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

export async function loader(_: LoaderFunctionArgs) {
	return json({ resume: resumeAssetUrl })
}

export default function Resume(): ReactElement {
	const { resume } = useLoaderData<typeof loader>()
	const { basics, skills, work, education, interests, languages } = mapToResume(resume)

	return (
		<article
			className={cn(
				'flex flex-col items-center justify-start gap-y-8',
				'w-full max-w-none',
				'prose prose-blue dark:prose-invert',
			)}
		>
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
