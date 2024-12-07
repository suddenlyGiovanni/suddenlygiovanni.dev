import { type ReactElement, type SyntheticEvent, memo, useCallback, useMemo } from 'react'
import { type NavLinkProps, NavLink as UnstyledNavLink, useFetcher } from 'react-router'

import { Icons } from '@suddenlygiovanni/ui/components/icons/icons.js'
import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'
import { NavigationMenuToggle } from '@suddenlygiovanni/ui/components/navigation-menu-toggle/navigation-menu-toggle.tsx'
import { SuddenlyGiovanni } from '@suddenlygiovanni/ui/components/suddenly-giovanni/suddenly-giovanni.tsx'
import { useToggle } from '@suddenlygiovanni/ui/hooks/use-toggle.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'
import { Button } from '@suddenlygiovanni/ui/ui/button.js'

import type { action } from '~/root.tsx'
import { type Theme, useOptimisticThemeMode } from '~/utils/theme.tsx'
import avatarAssetUrl from './assets/giovanni_ravalico-profile_bw.webp'

import { routesRecord } from './routes-record.ts'

/**
 * Calculates class name based on activated state and base classes
 * @param isActive - Is NavLink currently active
 * @param className - Optional class name
 * @returns  Resulting class name
 */
function calculateClassName({
	isActive,
	className,
}: {
	isActive: boolean
	className?: undefined | string
}): string {
	return clsx(
		// baseClasses
		'select-none p-1 font-medium text-foreground/60 capitalize transition-colors hover:text-foreground/80 md:text-sm',
		// disabledClasses
		'aria-[disabled]:pointer-events-none aria-[disabled]:cursor-not-allowed aria-[disabled]:line-through',
		// isActiveClasses
		isActive &&
			'text-foreground underline decoration-auto decoration-foreground decoration-wavy underline-offset-8',
		// Keyboard active classes
		'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring',
		className,
	)
}

function NavLink({
	children,
	className,
	...props
}: Omit<NavLinkProps, 'className'> & {
	className?: undefined | string
}): ReactElement {
	return (
		<UnstyledNavLink
			{...props}
			className={({ isActive }): string => calculateClassName({ isActive, className })}
		>
			{children}
		</UnstyledNavLink>
	)
}

const routes = (
	[
		routesRecord['about-me'],
		routesRecord['second-brain'],
		routesRecord['reading-journal'],
		routesRecord.resume,
		routesRecord.motivations,
	] as const
).filter(({ hidden }) => !hidden)

const PRIMARY_NAVIGATION = 'primary-navigation'

function computeNextThemeMode(currentTheme: Theme): Theme {
	const nextTheme = {
		light: 'dark',
		dark: 'system',
		system: 'light',
	} as const
	return nextTheme[currentTheme]
}

function ThemeSwitch({
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

export const Header = memo(function Header({
	theme,
}: { theme: 'light' | 'dark' | null }): ReactElement {
	const [isMobileNavigationVisible, toggleMobileNavigationVisibility] = useToggle(false)

	const handleMobileNavigationClick = useCallback(
		<T extends HTMLElement>(event: SyntheticEvent<T>) => {
			event.stopPropagation()
			toggleMobileNavigationVisibility()
		},
		[toggleMobileNavigationVisibility],
	)

	const renderLi = useMemo(
		() =>
			routes.map(({ title, url, uri, description, disabled }) => (
				<li
					className={clsx(
						'flex min-h-16 min-w-32 items-center justify-end outline-hidden md:min-h-fit md:min-w-fit',
					)}
					key={uri}
					// onClick={stopPropagation}
				>
					<NavLink
						aria-disabled={disabled ? 'true' : undefined}
						aria-label={description}
						onClick={handleMobileNavigationClick}
						prefetch="intent"
						role="menuitem"
						to={url}
						tabIndex={0}
					>
						{title}
					</NavLink>
				</li>
			)),

		[handleMobileNavigationClick],
	)

	return (
		<Layout.Header
			className={clsx([
				'sticky top-0 z-10 w-full overflow-x-clip border-border/40 border-b bg-background/95 py-2 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/60',
			])}
		>
			<div
				className={clsx([
					'container relative flex max-w-4xl flex-row items-center justify-between',
				])}
			>
				<SuddenlyGiovanni
					ariaLabel={routesRecord['about-me'].description}
					hrefUrl={avatarAssetUrl}
					to={routesRecord['about-me'].url}
				/>

				<NavigationMenuToggle
					aria-controls={PRIMARY_NAVIGATION}
					aria-expanded={isMobileNavigationVisible}
					className={clsx('absolute top-3 right-8 z-50 block md:hidden')}
					isSelected={isMobileNavigationVisible}
					onPress={toggleMobileNavigationVisibility}
				/>

				<nav aria-label="mobile navigation">
					<menu
						className={clsx(
							// Base styles
							'fixed flex px-8 py-12',
							// Mobile navigation
							'inset-0 z-40 h-screen transform-gpu flex-col items-end justify-start gap-12 border-border/40 bg-background/95 backdrop-blur-sm transition-transform delay-150 duration-300 ease-in-out supports-backdrop-filter:bg-background/60',
							// Desktop navigation
							'md:static md:z-auto md:h-full md:translate-x-0 md:flex-row md:items-center md:justify-between md:gap-2 md:bg-inherit md:bg-transparent md:p-0 md:backdrop-filter-none md:transition-none',
							// Mobile navigation
							isMobileNavigationVisible ? 'translate-x-0' : 'translate-x-full',
						)}
						id={PRIMARY_NAVIGATION}
						onClick={handleMobileNavigationClick}
						onKeyDown={handleMobileNavigationClick}
					>
						{renderLi}
						<ThemeSwitch
							userPreference={theme}
							className="ml-16 aspect-square"
						/>
					</menu>
				</nav>
			</div>
		</Layout.Header>
	)
})
