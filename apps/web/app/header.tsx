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

function NavLink({ children, ...props }: Omit<NavLinkProps, 'className'>): JSX.Element {
	return (
		<UnstyledNavLink
			{...props}
			className={({ isActive }) => {
				const base = 'select-none p-1 text-base font-medium capitalize md:text-sm'
				const disabled =
					'aria-[disabled]:pointer-events-none aria-[disabled]:cursor-not-allowed aria-[disabled]:line-through'
				const extended = `${base} + ${disabled}` as const
				return isActive ? (`${extended} border-b-2 border-stone-950` as const) : extended
			}}
		>
			{children}
		</UnstyledNavLink>
	)
}

export function Header(): JSX.Element {
	const [isMobileNavigationVisible, toggleMobileNavigationVisibility] = useToggle(false)
	return (
		<Layout.Header className="w-full border-b border-b-stone-950 bg-white py-4">
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
							'shadow-2x duration-30 fixed inset-y-0 left-[20%] right-0 z-auto flex flex-col items-center justify-between gap-2 bg-slate-700/20 px-8 py-12 backdrop-blur-xl transition-transform ease-in-out md:static md:h-full md:translate-x-0 md:flex-row md:items-center md:bg-inherit md:p-0 md:shadow-none md:backdrop-filter-none md:transition-none',
							isMobileNavigationVisible ?
								'translate-x-0 md:translate-x-0'
							:	'translate-x-full',
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
