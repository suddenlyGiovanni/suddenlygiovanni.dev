import { T } from '@repo/ui/components/typography/typography.tsx'
import type { JSX } from 'react'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/reading-journal.ts'

export const meta: Route.MetaFunction = () => {
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
