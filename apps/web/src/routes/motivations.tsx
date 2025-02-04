import type { ReactElement } from 'react'
import { Link } from 'react-router'

import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import Motivations from 'content/copy/motivations.md'

import { config } from '#config.ts'
import { routesRecord } from '#routes-record.ts'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/motivations.ts'

export const meta: Route.MetaFunction = () => {
	const title = `${config.siteName} | My Motivations`
	const description = 'What I value in a working environment'
	return [{ title }, { name: 'description', content: description }]
}

export default function Motivation(_: Route.ComponentProps): ReactElement {
	return (
		<article className={clsx('prose dark:prose-invert w-full max-w-none bg-background font-comic')}>
			<Motivations />
			<p>
				My previous work experience and contact informations are available in my{' '}
				<Link to={routesRecord.resume.url}>resume</Link>.
			</p>
		</article>
	)
}
