import type { ReactElement } from 'react'
import { useFetcher } from 'react-router'

import { Icons } from '@suddenlygiovanni/ui/components/icons/icons.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'
import { Button } from '@suddenlygiovanni/ui/ui/button.tsx'

import type { action } from '~/root.tsx'
import { type Theme, useOptimisticThemeMode } from '~/utils/theme.tsx'

function computeNextThemeMode(currentTheme: Theme): Theme {
	const nextTheme = {
		light: 'dark',
		dark: 'system',
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

	const optimisticMode = useOptimisticThemeMode()
	const mode = optimisticMode ?? userPreference ?? 'system'
	const modeLabel = {
		light: (
			<Icons.sun className={clsx('h-[1.2rem] w-[1.2rem]')}>
				<span className="sr-only">Light</span>
			</Icons.sun>
		),
		dark: (
			<Icons.moon className={clsx('h-[1.2rem] w-[1.2rem]')}>
				<span className="sr-only">Dark</span>
			</Icons.moon>
		),
		system: (
			<Icons.laptop
				name="laptop"
				className={clsx('h-[1.2rem] w-[1.2rem]')}
			>
				<span className="sr-only">System</span>
			</Icons.laptop>
		),
	}

	return (
		<fetcher.Form
			method="POST"
			className={className}
		>
			<input
				type="hidden"
				name="theme"
				value={computeNextThemeMode(mode)}
			/>
			<div className="flex gap-2">
				<Button
					className={clsx('flex h-8 w-8 cursor-pointer items-center justify-center')}
					size="icon"
					variant="ghost"
					data-testid="ThemeSwitch"
					type="submit"
				>
					{modeLabel[mode]}
				</Button>
			</div>
		</fetcher.Form>
	)
}
