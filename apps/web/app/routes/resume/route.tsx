import * as Schema from '@effect/schema/Schema'
import { formatError } from '@effect/schema/TreeFormatter'
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import resumeAssetUrl from '@suddenly-giovanni/resume/resume.json?raw'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'
import { Resume as ResumeSchema } from 'app/routes/resume/schema'
import * as Either from 'effect/Either'
import type { ReactElement } from 'react'
import { routesRecord } from '~/routes-record.ts'
import { Basics } from '~/routes/resume/basics.tsx'

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

export function loader(_: LoaderFunctionArgs) {
	const schema = Schema.parseJson(ResumeSchema)
	const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
	const maybeResume = parse(resumeAssetUrl)

	if (Either.isLeft(maybeResume)) {
		throw new Response(formatError(maybeResume.left), {
			// find the correct response code and message for this error caused by parsing issue....
			status: 500,
			statusText: 'Internal Server Error',
		})
	}
	return json({ resume: maybeResume.right })
}

export default function Resume(): ReactElement {
	const { resume } = useLoaderData<typeof loader>()
	const { basics, skills, work, education, interests, languages } = resume

	return (
		<article
			className={clsx(
				'flex flex-col items-center justify-start gap-y-8',
				'w-full max-w-none',
				'prose prose-blue dark:prose-invert',
			)}
		>
			<Basics basics={basics} />

			{/*<Skills skills={skills} />*/}

			{/*<Experiences works={work} />*/}

			{/*<Education educations={education} />*/}

			{/*<Interests interests={interests} />*/}

			{/*<Languages languages={languages} />*/}

			<footer className="flex w-full items-center justify-between">
				<Link className="inline-block" to={routesRecord['about-me'].url}>
					&larr; back to my About Me
				</Link>
			</footer>
		</article>
	)
}
