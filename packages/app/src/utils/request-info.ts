import { invariant } from '@epic-web/invariant'
import { useRouteLoaderData } from 'react-router'

import type { Info } from '../+types/root.ts'

export function useOptionalRequestInfo(): Info['loaderData']['requestInfo'] | undefined {
	return useRouteLoaderData<Info['loaderData']>('root')?.requestInfo
}

export function useRequestInfo(): Info['loaderData']['requestInfo'] {
	const maybeRequestInfo = useOptionalRequestInfo()
	invariant(maybeRequestInfo, 'No requestInfo found in root loader')

	return maybeRequestInfo
}
