import { getHintUtils } from '@epic-web/client-hints'
import { clientHint as colorSchemeHint } from '@epic-web/client-hints/color-scheme'
import { clientHint as reducedMotionSchemaHint } from '@epic-web/client-hints/reduced-motion'
import { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone'
import { useRequestInfo } from './request-info'

const hintsUtils = getHintUtils({
	reducedMotion: reducedMotionSchemaHint,
	theme: colorSchemeHint,
	timeZone: timeZoneHint,
})

export const { getHints } = hintsUtils

export function useHints() {
	const requestInfo = useRequestInfo()
	return requestInfo.hints
}
