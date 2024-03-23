import { parseWithZod } from '@conform-to/zod'
import { useFetchers } from '@remix-run/react'
import { z } from 'zod'
import { useHints } from './client-hints.tsx'
import { useRequestInfo } from './request-info.ts'

export const ThemeFormSchema = z.object({
	theme: z.enum(['system', 'light', 'dark']),
})

export function useOptimisticThemeMode(): 'light' | 'dark' | 'system' | undefined {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find(f => f.formAction === '/')

	if (themeFetcher?.formData) {
		const submission = parseWithZod(themeFetcher.formData, {
			schema: ThemeFormSchema,
		})

		if (submission.status === 'success') {
			return submission.value.theme
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
