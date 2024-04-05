import * as Schema from '@effect/schema/Schema'
import { formatError } from '@effect/schema/TreeFormatter'
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import * as Either from 'effect/Either'
import type { ReactElement } from 'react'

import { Types, makeOpenGraphWebsite } from '@suddenly-giovanni/open-graph-protocol'
import resumeAssetUrl from '@suddenly-giovanni/resume/resume.json?raw'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'

import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '~/config.ts'
import { routesRecord } from '~/routes-record.ts'
import { Languages } from '~/routes/resume/languages.tsx'
import { Resume as ResumeSchema } from '~/.server/schemas/resume/resume.ts'

import { Basics } from './basics.tsx'
import { Education } from './education.tsx'
import { Experiences } from './experiences.tsx'
import { Interests } from './interests.tsx'
import { Skills } from './skills.tsx'


export function meta({ location }: Parameters<MetaFunction>[number]) {
	const title = `${config.siteName} | Résumé`
	const description =
		"Giovanni Ravalico's Résumé. A place where I showcase my professional experience and skills."
	return [
		{ title },
		{ name: 'description', content: description },
		makeOpenGraphWebsite({
			ogDescription: Types.String(description),
			ogImage: Types.URL(config.siteUrl + hero2800wAssetUrl),
			ogTitle: Types.String(title),
			ogType: Types.Enum('website'),
			ogUrl: Types.URL(config.siteUrl + location.pathname),
		}),
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
		// eslint-disable-next-line @typescript-eslint/no-throw-literal -- we want to throw here
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

			<Skills skills={skills} />

			<Experiences work={work} />

			<Education educations={education} />

			{interests ? <Interests interests={interests} /> : null}

			{languages ? <Languages languages={languages} /> : null}

			<footer className="flex w-full items-center justify-between">
				<Link className="inline-block" to={routesRecord['about-me'].url}>
					&larr; back to my About Me
				</Link>
			</footer>
		</article>
	)
}
