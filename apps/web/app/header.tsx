import { NavLink as UnstyledNavLink, type NavLinkProps } from '@remix-run/react'
import {
	Layout,
	ModeToggle,
	NavigationMenuToggle,
	SuddenlyGiovanni,
} from '@suddenly-giovanni/ui/components'
import { useToggle } from '@suddenly-giovanni/ui/hooks'
import { cn } from '@suddenly-giovanni/ui/lib'
import { type ReactElement, type SyntheticEvent, memo, useCallback, useMemo } from 'react'
import { type Theme, useTheme } from 'remix-themes'
import avatarAssetUrl from './assets/giovanni_ravalico-profile_bw.webp'
import { routesRecord } from './routes-record'

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
	return cn(
		// baseClasses
		[
			'select-none',
			'p-1',
			'font-medium',
			'capitalize',
			'md:text-sm',
			'transition-colors',
			'hover:text-foreground/80',
			'text-foreground/60',
		],
		// disabledClasses
		[
			'aria-[disabled]:pointer-events-none',
			'aria-[disabled]:cursor-not-allowed',
			'aria-[disabled]:line-through',
		],
		// isActiveClasses
		isActive && [
			'text-foreground',
			'decoration-wavy',
			'underline-offset-8',
			'underline',
			'decoration-auto',
			'decoration-foreground',
		],
		// Keyboard active classes
		['focus-visible:outline-none', 'focus-visible:ring-1', 'focus-visible:ring-ring'],
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
			className={({ isActive }) => calculateClassName({ isActive, className })}
		>
			{children}
		</UnstyledNavLink>
	)
}

const routes = (
	[
		routesRecord['about-me'],
		routesRecord['brain-dump'],
		routesRecord['reading-journal'],
		routesRecord.resume,
		routesRecord.motivations,
	] as const
).filter(({ hidden }) => !hidden)

const PRIMARY_NAVIGATION = 'primary-navigation'

export const Header = memo(function Header(): ReactElement {
	const [isMobileNavigationVisible, toggleMobileNavigationVisibility] = useToggle(false)
	const [theme, setTheme] = useTheme()

	const handleMobileNavigationClick = useCallback(
		<T extends HTMLElement>(event: SyntheticEvent<T>) => {
			event.stopPropagation()
			toggleMobileNavigationVisibility()
		},
		[toggleMobileNavigationVisibility],
	)

	const stopPropagation = useCallback(<T extends HTMLElement>(event: SyntheticEvent<T>) => {
		event.stopPropagation()
	}, [])

	const handleThemeChange = useCallback(
		(t: Theme.DARK | Theme.LIGHT): void => {
			setTheme(t)
			toggleMobileNavigationVisibility()
		},
		[setTheme, toggleMobileNavigationVisibility],
	)

	const renderLi = useMemo(
		() =>
			routes.map(({ title, url, uri, description, disabled }) => (
				<li
					className={cn(
						'flex min-h-16 min-w-32 items-center justify-end',
						'md:min-h-fit md:min-w-fit',
						'outline-none',
					)}
					key={uri}
					onClick={stopPropagation}
					role="menuitem"
					tabIndex={0}
				>
					<NavLink
						aria-disabled={disabled ? 'true' : undefined}
						aria-label={description}
						onClick={handleMobileNavigationClick}
						prefetch="intent"
						role="link"
						to={url}
					>
						{title}
					</NavLink>
				</li>
			)),

		[handleMobileNavigationClick, stopPropagation],
	)

	return (
		<Layout.Header
			className={cn([
				'sticky',
				'top-0',
				'w-full',
				'z-10',
				'border-b',
				'py-2',
				'border-border/40',
				'bg-background/95',
				'backdrop-blur',
				'shadow',
				'supports-[backdrop-filter]:bg-background/60',
				'overflow-x-clip',
			])}
		>
			<div
				className={cn([
					'container',
					'flex',
					'flex-row',
					'items-center',
					'relative',
					'max-w-4xl',
					'justify-between',
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
					className={cn('absolute', 'block', 'md:hidden', 'right-8', 'top-3', 'z-50')}
					isSelected={isMobileNavigationVisible}
					onPress={toggleMobileNavigationVisibility}
				/>

				<nav aria-label="mobile navigation">
					<menu
						className={cn(
							// Base styles
							['fixed', 'flex', 'px-8', 'py-12'],
							// Mobile navigation
							[
								'inset-0',
								'z-40',
								'h-screen',
								'transform-gpu',
								'flex-col',
								'items-end',
								'justify-start',
								'gap-12',
								'border-border/40',
								'bg-background/95',
								'backdrop-blur',
								'supports-[backdrop-filter]:bg-background/60',
								'transition-transform',
								'delay-150',
								'duration-300',
								'ease-in-out',
							],
							// Desktop navigation
							[
								'md:static',
								'md:z-auto',
								'md:h-full',
								'md:translate-x-0',
								'md:flex-row',
								'md:items-center',
								'md:justify-between',
								'md:gap-2',
								'md:bg-inherit',
								'md:p-0',
								'md:backdrop-filter-none',
								'md:bg-transparent',
								'md:transition-none',
							],
							// Mobile navigation
							isMobileNavigationVisible ? 'translate-x-0 ' : 'translate-x-full',
						)}
						id={PRIMARY_NAVIGATION}
						onClick={handleMobileNavigationClick}
						role="menu"
					>
						{renderLi}
						<ModeToggle
							className="ml-16 aspect-square"
							setTheme={handleThemeChange}
							theme={theme}
						/>
					</menu>
				</nav>
			</div>
		</Layout.Header>
	)
})
