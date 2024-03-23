import { useFetchers } from '@remix-run/react'
import * as Schema from '@effect/schema/Schema'
import * as Either from 'effect/Either'

import { useHints } from './client-hints.tsx'
import { useRequestInfo } from './request-info.ts'

export const ThemeFormSchema = Schema.struct({
	theme: Schema.union(
		Schema.literal('light'),
		Schema.literal('dark'),
		Schema.literal('system'),
	).annotations({
		title: 'Theme',
		description: 'The theme to set',
		examples: ['light', 'dark', 'system'],
	}),
})

export function useOptimisticThemeMode(): 'light' | 'dark' | 'system' | undefined {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find(f => f.formAction === '/')

	if (themeFetcher?.formData) {
		const formData = themeFetcher.formData
		const payload = Object.fromEntries(formData)
		const parse = Schema.decodeUnknownEither(ThemeFormSchema, { errors: 'all' })
		const result = parse(payload)

		if (Either.isRight(result)) {
			return result.right.theme
		}
	}
	return undefined
}

/**
 * Returns the theme mode based on the user's preferences and system hints.
 * If the user's preference is not set, it falls back to the system hints.
 */
export function useTheme(): 'light' | 'dark' | null {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	if (optimisticMode) {
		return optimisticMode === 'system' ? hints.theme : optimisticMode
	}

	return requestInfo.userPrefs.theme ?? hints.theme
}
