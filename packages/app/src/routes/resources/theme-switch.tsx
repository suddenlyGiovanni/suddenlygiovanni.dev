import { getFormProps, type SubmissionResult, useForm } from '@conform-to/react'
import { invariantResponse } from '@epic-web/invariant'
import { Icons } from '@repo/ui/components/icons/icons.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import { Button } from '@repo/ui/ui/button.tsx'
import { Either, Schema } from 'effect'
import type { ReactElement } from 'react'
import { data, redirect, useFetcher, useFetchers } from 'react-router'
import { ServerOnly } from 'remix-utils/server-only'

import { useHints, useOptionalHints } from '#root/src/utils/client-hints.tsx'
import { useOptionalRequestInfo, useRequestInfo } from '#root/src/utils/request-info.ts'
import { setTheme } from '#root/src/utils/theme.server.ts'

import type { Route } from '.react-router/types/src/routes/resources/+types/theme-switch.ts'

const themeSchema = Schema.Literal('light', 'dark', 'system').annotations({
	description: 'The theme to set',
	examples: ['light', 'dark', 'system'],
	title: 'Theme',
})
export const ThemeFormSchema = Schema.Struct({
	redirectTo: Schema.optional(Schema.String).annotations({
		description: 'URL to redirect to after setting the theme',
		examples: ['/', '/about'],
		title: 'Redirect to',
	}),
	theme: themeSchema,
})
export type Theme = Schema.Schema.Type<typeof themeSchema>

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const payload = Object.fromEntries(formData)
	const parse = Schema.decodeUnknownEither(ThemeFormSchema, { errors: 'all' })
	const result = parse(payload)
	invariantResponse(Either.isRight(result), 'Invalid theme received', { status: 400 })

	const { theme, redirectTo } = result.right

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	if (redirectTo) {
		return redirect(redirectTo, responseInit)
	}

	return data(
		{
			result: {
				fields: Object.keys(payload),
				initialValue: payload as Record<string, string>,
				state: {
					validated: {
						redirectTo: true,
						theme: true,
					},
				},
				status: 'success',
			} satisfies SubmissionResult,
		},
		responseInit,
	)
}

function computeNextThemeMode(currentTheme: Theme): Theme {
	const nextTheme = {
		dark: 'system',
		light: 'dark',
		system: 'light',
	} as const
	return nextTheme[currentTheme]
}

export function ThemeSwitch({
	userPreference,
	className,
}: {
	readonly userPreference?: 'light' | 'dark' | null
	readonly className?: string
}): ReactElement {
	const fetcher = useFetcher<typeof action>()
	const requestInfo = useRequestInfo()

	const [form] = useForm<Schema.Schema.Type<typeof ThemeFormSchema>>({
		id: 'theme-switch',
		lastResult: fetcher.data && 'result' in fetcher.data ? fetcher.data.result : null,
	})

	const optimisticMode = useOptimisticThemeMode()
	const mode = optimisticMode ?? userPreference ?? 'system'
	const nextMode = computeNextThemeMode(mode)

	const modeLabel = {
		dark: (
			<Icons.moon className={clsx('h-[1.2rem] w-[1.2rem]')}>
				<span className="sr-only">Dark</span>
			</Icons.moon>
		),
		light: (
			<Icons.sun className={clsx('h-[1.2rem] w-[1.2rem]')}>
				<span className="sr-only">Light</span>
			</Icons.sun>
		),
		system: (
			<Icons.laptop
				className={clsx('h-[1.2rem] w-[1.2rem]')}
				name="laptop"
			>
				<span className="sr-only">System</span>
			</Icons.laptop>
		),
	}

	return (
		<fetcher.Form
			className={className}
			method="POST"
			{...getFormProps(form)}
			action="/resources/theme-switch"
		>
			<ServerOnly>
				{(): ReactElement => (
					<input
						name="redirectTo"
						type="hidden"
						value={requestInfo.path}
					/>
				)}
			</ServerOnly>
			<input
				name="theme"
				type="hidden"
				value={nextMode}
			/>
			<div className="flex gap-2">
				<Button
					className={clsx('flex h-8 w-8 cursor-pointer items-center justify-center')}
					data-testid="ThemeSwitch"
					size="icon"
					type="submit"
					variant="ghost"
				>
					{modeLabel[mode]}
				</Button>
			</div>
		</fetcher.Form>
	)
}

export function useOptimisticThemeMode(): Theme | undefined {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find(f => f.formAction === '/resources/theme-switch')

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
export function useTheme(): Exclude<Theme, 'system'> | null {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	if (optimisticMode) {
		return optimisticMode === 'system' ? hints.theme : optimisticMode
	}

	return requestInfo.userPrefs.theme ?? hints.theme
}

export function useOptionalTheme(): 'light' | 'dark' | undefined {
	const optionalHints = useOptionalHints()
	const optionalRequestInfo = useOptionalRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	if (optimisticMode) {
		return optimisticMode === 'system' ? optionalHints?.theme : optimisticMode
	}
	return optionalRequestInfo?.userPrefs.theme ?? optionalHints?.theme
}
