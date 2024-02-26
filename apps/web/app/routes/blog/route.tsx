import type { MetaFunction } from '@remix-run/node'
import { T } from '@suddenly-giovanni/ui'
import type { JSX } from 'react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Blog' },
		{
			name: 'description',
			content:
				"suddenlyGiovanni's personal engineering blog. A Place where I experiment with software and write about my coding journey",
		},
	]
}

export default function Blog(): JSX.Element {
	return <T.h2>Blog page</T.h2>
}
