import type { MetaFunction } from '@remix-run/node'
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
	return <h2>Blog page</h2>
}
