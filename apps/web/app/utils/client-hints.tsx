import { getHintUtils } from '@epic-web/client-hints'
import { clientHint as colorSchemeHint } from '@epic-web/client-hints/color-scheme'
import { clientHint as reducedMotionSchemaHint } from '@epic-web/client-hints/reduced-motion'
import { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Info } from '../+types/root.ts'
import { useRequestInfo } from './request-info.ts'

const hintsUtils = getHintUtils({
	reducedMotion: reducedMotionSchemaHint,
	theme: colorSchemeHint,
	timeZone: timeZoneHint,
})

export const { getHints } = hintsUtils

export function useHints(): Info['loaderData']['requestInfo']['hints'] {
	const requestInfo = useRequestInfo()
	return requestInfo.hints
}
