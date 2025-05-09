import { clsx } from '@repo/ui/lib/utils.ts'
import type { ReactElement } from 'react'
import { Link } from 'react-router'

import Motivations from '#root/content/copy/motivations.md'
import { config } from '#root/src/config.ts'
import { routesRecord } from '#root/src/routes-record.ts'

import type { Route } from './+types/motivations.ts'

export const meta: Route.MetaFunction = () => {
	const title = `${config.siteName} | My Motivations`
	const description = 'What I value in a working environment'
	return [{ title }, { content: description, name: 'description' }]
}

export default function Motivation(_: Route.ComponentProps): ReactElement {
	return (
		<article className={clsx('prose dark:prose-invert max-w-full bg-background font-comic')}>
			<Motivations />
			<p>
				My previous work experience and contact informations are available in my{' '}
				<Link to={routesRecord.resume.url}>resume</Link>.
			</p>
		</article>
	)
}
