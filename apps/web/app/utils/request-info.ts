import { invariant } from '@epic-web/invariant'
import { useRouteLoaderData } from 'react-router'
import type { loader as rootLoader } from '~/root.tsx'
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Info } from '../+types/root.ts'

export function useRequestInfo(): Info['loaderData']['requestInfo'] {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')
	return data.requestInfo
}

export function useOptionalRequestInfo(): Info['loaderData']['requestInfo'] | undefined {
	return useRouteLoaderData<typeof rootLoader>('root')?.requestInfo
}
