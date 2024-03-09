import type { MetaFunction } from '@remix-run/node'
import { T } from '@suddenly-giovanni/ui/components'
import type { JSX } from 'react'
import { routesRecord } from '~/routes-record.ts'

export const meta: MetaFunction = () => {
	return [
		{ title: routesRecord['brain-dump'].title },
		{
			name: 'description',
			content:
				"suddenlyGiovanni's personal engineering brain dump. A Place where I experiment with software and write about my coding journey",
		},
	]
}

export default function BrainDump(): JSX.Element {
	return (
		<article className="prose w-full max-w-none bg-background font-comic dark:prose-invert">
			<T.h2>BrainDump</T.h2>
		</article>
	)
}
