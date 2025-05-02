import { clsx } from '@repo/ui/lib/utils.ts'
import Motivations from 'content/copy/motivations.md'
import type { ReactElement } from 'react'
import { Link } from 'react-router'

import { config } from '#root/client/config.ts'
import { routesRecord } from '#root/client/routes-record.ts'

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
