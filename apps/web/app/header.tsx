import type { NavLinkProps } from '@remix-run/react'
import { NavLink as UnstyledNavLink } from '@remix-run/react'
import {
	cn,
	Layout,
	NavigationMenuToggle,
	SuddenlyGiovanni,
	useToggle,
} from '@suddenly-giovanni/ui'
import type { JSX } from 'react'
import avatarAssetUrl from './assets/giovanni_ravalico-profile_bw.webp'

/**
 * Calculates class name based on activated state and base classes
 * @param isActive - Is NavLink currently active
 * @returns  Resulting class name
 */
function calculateClassName({ isActive }: { isActive: boolean }): string {
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
	)
}

function NavLink({ children, ...props }: Omit<NavLinkProps, 'className'>): JSX.Element {
	return (
		<UnstyledNavLink
			{...props}
			className={calculateClassName}
		>
			{children}
		</UnstyledNavLink>
	)
}

export function Header(): JSX.Element {
	const [isMobileNavigationVisible, toggleMobileNavigationVisibility] = useToggle(false)
	return (
		<Layout.Header className="w-full border-b border-b-stone-950 bg-white py-2 md:py-4">
			<div className="container relative flex w-full justify-between gap-4">
				<SuddenlyGiovanni
					ariaLabel="Navigate to blog page"
					hrefUrl={avatarAssetUrl}
					to="/blog"
				/>

				<NavigationMenuToggle
					aria-controls="primary-navigation"
					className={cn('absolute right-8 top-3 z-40 block md:hidden')}
					isSelected={isMobileNavigationVisible}
					onPress={toggleMobileNavigationVisibility}
				/>

				<nav aria-label="mobile navigation">
					<menu
						className={cn(
							// Base styles
							'fixed z-auto flex items-center justify-between gap-2 px-8 py-12',
							// Mobile navigation
							'inset-0 transform-gpu flex-col bg-slate-700/10 shadow-none backdrop-blur-md transition-transform delay-150 duration-300 ease-in-out',
							// Desktop navigation
							'md:static md:h-full md:translate-x-0 md:flex-row md:items-center md:bg-inherit md:p-0 md:shadow-none md:backdrop-filter-none md:transition-none',
							// Mobile navigation
							isMobileNavigationVisible ? 'translate-x-0 ' : (
								'translate-x-full shadow-2xl shadow-slate-400'
							),
						)}
						id="primary-navigation"
					>
						<li>
							<NavLink
								prefetch="intent"
								tabIndex={0}
								to="/"
							>
								about me
							</NavLink>
						</li>
						<li>
							<NavLink
								prefetch="intent"
								tabIndex={0}
								to="/blog"
							>
								blog
							</NavLink>
						</li>
						<li>
							<NavLink
								aria-disabled
								prefetch="intent"
								tabIndex={0}
								to="/reading-journal"
							>
								reading journal
							</NavLink>
						</li>
						<li>
							<NavLink
								prefetch="intent"
								tabIndex={0}
								to="/resume"
							>
								résumé
							</NavLink>
						</li>
					</menu>
				</nav>
			</div>
		</Layout.Header>
	)
}
