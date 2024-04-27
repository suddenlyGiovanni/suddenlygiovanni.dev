import {
	type LinksFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Effect } from 'effect'
import type { ReactElement } from 'react'

import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import * as repository from '~/.server/repositories/github'
import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '~/config.ts'
import { routesRecord } from '~/routes-record.ts'
import { Languages } from '~/routes/resume/languages.tsx'

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

export async function loader(_: LoaderFunctionArgs) {
	try {
		const { resume, meta } = await Effect.runPromise(repository.github.getResume())
		return json({ resume, meta })
	} catch (error) {
		console.error(error)
		throw new Response('Some error !!!', {
			// find the correct response code and message for this error caused by parsing issue....
			status: 500,
			statusText: 'Internal Server Error',
		})
	}
}

export default function Resume(): ReactElement {
	const { resume, meta } = useLoaderData<typeof loader>()
	const { basics, skills, work, education, interests, languages } = resume

	return (
		<article
			class={clsx(
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

			<footer class="flex w-full items-center justify-between">
				<Link class="inline-block" to={routesRecord['about-me'].url}>
					&larr; back to my About Me
				</Link>
				<small>
					{meta.lastModified ? (
						<span>
							last modified:{' '}
							<time dateTime={new Date(meta.lastModified).toISOString()}>
								{new Date(meta.lastModified).toLocaleDateString('en-US', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</time>
						</span>
					) : null}
					{meta.version ? (
						<span class="ml-4">
							<a href={meta.canonical} target="_blank" rel="noreferrer">
								version {meta.version}
							</a>
						</span>
					) : null}
				</small>
			</footer>
		</article>
	)
}
