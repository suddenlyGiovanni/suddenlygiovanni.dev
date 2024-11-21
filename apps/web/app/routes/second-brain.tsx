import type { MetaFunction } from '@remix-run/node'
import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'
import type { JSX } from 'react'
import { routesRecord } from '~/routes-record.ts'

export const meta: MetaFunction = () => {
	return [
		{ title: routesRecord['second-brain'].title },
		{
			name: 'description',
			content:
				"suddenlyGiovanni's personal engineering brain dump. A Place where I experiment with software and write about my coding journey",
		},
	]
}

export default function SecondBrain(): JSX.Element {
	return (
		<article className={clsx('prose dark:prose-invert w-full max-w-none bg-background font-comic')}>
			<T.h2>Second Brain</T.h2>
		</article>
	)
}
