import type { NavLinkProps } from '@remix-run/react'
import { NavLink as UnstyledNavLink } from '@remix-run/react'
import {
	cn,
	Layout,
	NavigationMenuToggle,
	SuddenlyGiovanni,
	useToggle,
} from '@suddenly-giovanni/ui'
import { useCallback, type JSX, type SyntheticEvent } from 'react'
import avatarAssetUrl from './assets/giovanni_ravalico-profile_bw.webp'

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
		['select-none', 'p-1', 'text-base', 'font-medium', 'capitalize', 'md:text-sm'],
		// disabledClasses
		[
			'aria-[disabled]:pointer-events-none',
			'aria-[disabled]:cursor-not-allowed',
			'aria-[disabled]:line-through',
		],
		// isActiveClasses
		isActive && ['border-b-2', 'border-stone-950'],
		className,
	)
}

function NavLink({
	children,
	className,
	...props
}: Omit<NavLinkProps, 'className'> & {
	className?: undefined | string
}): JSX.Element {
	return (
		<UnstyledNavLink
			{...props}
			className={({ isActive }) => calculateClassName({ isActive, className })}
		>
			{children}
		</UnstyledNavLink>
	)
}

const routes = [
	{ label: 'about me', to: '/' },
	{ label: 'blog', to: '/blog' },
	{ label: 'reading journal', to: '/reading-journal', disabled: true },
	{ label: 'résumé', to: '/resume' },
] satisfies readonly { label: string; to: string; disabled?: boolean }[]

const PRIMARY_NAVIGATION = 'primary-navigation'

export function Header(): JSX.Element {
	const [isMobileNavigationVisible, toggleMobileNavigationVisibility] = useToggle(false)

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

	return (
		<Layout.Header className="w-full border-b border-b-stone-950 bg-white py-2 md:py-4">
			<div className="container relative flex w-full justify-between gap-4">
				<SuddenlyGiovanni
					ariaLabel="Navigate to blog page"
					hrefUrl={avatarAssetUrl}
					to="/blog"
				/>

				<NavigationMenuToggle
					aria-controls={PRIMARY_NAVIGATION}
					aria-expanded={isMobileNavigationVisible}
					className={cn('absolute right-8 top-3 z-40 block md:hidden')}
					isSelected={isMobileNavigationVisible}
					onPress={toggleMobileNavigationVisibility}
				/>

				<nav aria-label="mobile navigation">
					<menu
						className={cn(
							// Base styles
							'fixed z-auto flex  px-8 py-12',
							// Mobile navigation
							'inset-0 transform-gpu flex-col items-end justify-start gap-12 bg-slate-700/10 shadow-none backdrop-blur-md transition-transform  delay-150  duration-300 ease-in-out',
							// Desktop navigation
							'md:static md:h-full md:translate-x-0 md:flex-row md:items-center md:justify-between md:gap-2 md:bg-inherit md:p-0 md:shadow-none md:backdrop-filter-none md:transition-none',
							// Mobile navigation
							isMobileNavigationVisible ? 'translate-x-0 ' : (
								'translate-x-full shadow-2xl shadow-slate-400'
							),
						)}
						id={PRIMARY_NAVIGATION}
						onClick={handleMobileNavigationClick}
						role="menu"
					>
						{routes.map(({ label, to, disabled }) => (
							<li
								className={cn(
									'flex min-h-16 min-w-32 items-center justify-end',
									'md:min-h-fit md:min-w-fit',
								)}
								key={to}
								onClick={stopPropagation}
								role="menuitem"
							>
								<NavLink
									aria-disabled={disabled}
									className=""
									onClick={handleMobileNavigationClick}
									prefetch="intent"
									tabIndex={0}
									to={to}
								>
									{label}
								</NavLink>
							</li>
						))}
					</menu>
				</nav>
			</div>
		</Layout.Header>
	)
}
