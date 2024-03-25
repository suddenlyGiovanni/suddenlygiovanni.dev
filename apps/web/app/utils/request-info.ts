import { invariant } from '@epic-web/invariant'
import { useRouteLoaderData } from '@remix-run/react'
import type { loader as rootLoader } from '~/root.tsx'

export function useRequestInfo() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')
	return data.requestInfo
}
