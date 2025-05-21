import { T } from '@repo/ui/components/typography/typography.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import { Effect } from 'effect'
import type { ReactElement } from 'react'

import { routesRecord } from '#root/src/routes-record.ts'
import { GithubService } from '#root/src/services/github-service.ts'
import { loaderFunction } from '#root/src/services/index.ts'

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

export const loader = loaderFunction(_ =>
	Effect.gen(function* () {
		const githubService = yield* GithubService

		const octokitResponse = yield* githubService.listFiles(
			'suddenlyGiovanni',
			'second-brain',
			'main',
		)

		return octokitResponse
	}),
)

export default function SecondBrain({ loaderData }: Route.ComponentProps): ReactElement {
	console.dir(loaderData)
	return (
		<article className={clsx('prose dark:prose-invert w-full max-w-none bg-background font-comic')}>
			<T.h2>Second Brain</T.h2>
		</article>
	)
}
