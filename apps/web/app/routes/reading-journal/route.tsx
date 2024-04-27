import type { MetaFunction } from '@remix-run/node'
import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'
import type { JSX } from 'react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Reading Journal' },
		{
			name: 'description',
			content:
				"My reading journal. A place where I write about the books I'm reading and my thoughts about them.",
		},
	]
}

export default function ReadingJournal(): JSX.Element {
	return <T.h2>Reading Journal page</T.h2>
}
