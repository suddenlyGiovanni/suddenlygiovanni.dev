import { T } from '@repo/ui/components/typography/typography.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import type { ReactElement } from 'react'

import { routesRecord } from '#root/client/routes-record.ts'

import type { Route } from './+types/second-brain.ts'

export const meta: Route.MetaFunction = () => {
	return [
		{ title: routesRecord['second-brain'].title },
		{
			content:
				"suddenlyGiovanni's personal engineering brain dump. A Place where I experiment with software and write about my coding journey",
			name: 'description',
		},
	]
}

export default function SecondBrain(): ReactElement {
	return (
		<article className={clsx('prose dark:prose-invert w-full max-w-none bg-background font-comic')}>
			<T.h2>Second Brain</T.h2>
		</article>
	)
}
