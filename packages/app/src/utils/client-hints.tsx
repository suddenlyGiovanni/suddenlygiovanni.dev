import { getHintUtils } from '@epic-web/client-hints'
import {
	clientHint as colorSchemeHint,
	subscribeToSchemeChange,
} from '@epic-web/client-hints/color-scheme'
import { clientHint as reducedMotionSchemaHint } from '@epic-web/client-hints/reduced-motion'
import { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone'
import { type ReactElement, useEffect } from 'react'
import { useRevalidator } from 'react-router'

import type { Info } from '../+types/root.ts'
import { useOptionalRequestInfo, useRequestInfo } from './request-info.ts'

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
export function useOptionalHints() {
	const requestInfo = useOptionalRequestInfo()
	return requestInfo?.hints
}

/**
 * @returns inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 */
export function ClientHintCheck({ nonce }: { nonce?: string }): ReactElement {
	const { revalidate } = useRevalidator()
	useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate])

	return (
		<script
			dangerouslySetInnerHTML={{
				__html: hintsUtils.getClientHintCheckScript(),
			}}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			nonce={nonce}
		/>
	)
}
