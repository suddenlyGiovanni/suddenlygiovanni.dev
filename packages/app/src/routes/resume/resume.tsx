import { makeOpenGraphWebsite, Types } from '@repo/open-graph-protocol'
import { clsx } from '@repo/ui/lib/utils.ts'
import { Effect } from 'effect'
import type { ReactElement } from 'react'
import { Link } from 'react-router'

import hero2800wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '#root/src/config.ts'
import { Languages } from '#root/src/routes/resume/languages.tsx'
import { routesRecord } from '#root/src/routes-record.ts'
import { ResumeRepository } from '#root/src/services/resume-repository.server.ts'
import { ReactRouterServersRuntime } from '#root/src/services/runtime-server.ts'

import type { Route } from './+types/resume.ts'
import { Basics } from './basics.tsx'
import { Education } from './education.tsx'
import { Experiences } from './experiences.tsx'
import { Interests } from './interests.tsx'
import { Skills } from './skills.tsx'

export function meta({ location }: Route.MetaArgs) {
	const title = `${config.siteName} | Résumé`
	const description =
		"Giovanni Ravalico's Résumé. A place where I showcase my professional experience and skills."
	return [
		{ title },
		{ content: description, name: 'description' },
		makeOpenGraphWebsite({
			ogDescription: Types.String(description),
			ogImage: Types.URL(config.siteUrl + hero2800wAssetUrl),
			ogTitle: Types.String(title),
			ogType: Types.Enum('website'),
			ogUrl: Types.URL(config.siteUrl + location.pathname),
		}),
	]
}

export const links: Route.LinksFunction = () => {
	return [
		{
			href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
			rel: 'stylesheet',
			type: 'text/css',
		},
	]
}

export const loader = ReactRouterServersRuntime.makeServerLoaderFunction(() =>
	ResumeRepository.pipe(Effect.flatMap(repo => repo.getResume())),
)

/**
 * Renders the résumé page with sections for basics, skills, work experience, education, interests, and languages.
 *
 * Displays résumé metadata such as last modified date and version in the footer, and provides a link back to the About Me page.
 *
 * @param loaderData - The loaded résumé data and associated metadata.
 * @returns The complete résumé page as a React element.
 */
export default function Resume({ loaderData }: Route.ComponentProps): ReactElement {
	const { resume, meta } = loaderData
	const { basics, skills, work, education, interests, languages } = resume

	return (
		<article
			className={clsx(
				'prose prose-blue dark:prose-invert flex w-full max-w-none flex-col items-center justify-start gap-y-8',
			)}
		>
			<Basics basics={basics} />

			<Skills skills={skills} />

			<Experiences work={work} />

			<Education educations={education} />

			{interests ? <Interests interests={interests} /> : null}

			{languages ? <Languages languages={languages} /> : null}

			<footer className="flex w-full items-center justify-between">
				<Link
					className="inline-block"
					to={routesRecord['about-me'].url}
				>
					&larr; back to my About Me
				</Link>
				<small>
					<LastModified lastModified={meta.lastModified} />

					<Version
						href={meta.canonical}
						version={meta.version}
					/>
				</small>
			</footer>
		</article>
	)
}

/**
 * Displays the last modified date in a human-readable format if provided.
 *
 * @param lastModified - The date to display, or undefined to render nothing.
 * @returns A span element with the formatted date, or null if no date is given.
 */
function LastModified({ lastModified }: { lastModified: undefined | Date }) {
	const formatDate = (date: Date): string =>
		date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

	if (!lastModified) return null

	return (
		<span>
			last modified: <time dateTime={lastModified.toISOString()}>{formatDate(lastModified)}</time>
		</span>
	)
}

/**
 * Displays the résumé version as text or a link.
 *
 * If a URL is provided, the version is rendered as a hyperlink; otherwise, it is shown as plain text.
 *
 * @param version - The résumé version string to display.
 * @param href - Optional URL to link the version text.
 */
function Version({ version, href }: { version: string; href: undefined | string }) {
	const resumeVersion = `version ${version}`

	return (
		<span className="ml-4">
			{href ? (
				<a
					href={href}
					rel="noreferrer"
					target="_blank"
				>
					{resumeVersion}
				</a>
			) : (
				resumeVersion
			)}
		</span>
	)
}
