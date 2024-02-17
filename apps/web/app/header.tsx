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
				const base = 'p-1'
				const disabled = 'aria-[disabled]:cursor-not-allowed aria-[disabled]:line-through'
				const extended = `${base} + ${disabled}` as const
				return isActive ? (`${extended} border-b-2 border-stone-950` as const) : extended
			}}
		>
			{children}
		</UnstyledNavLink>
	)
}

export function Header(): JSX.Element {
	const [value, toggle] = useToggle(false)
	return (
		<Layout.Header className="relative flex w-full justify-between gap-4 border-b border-b-stone-950 py-4">
			<SuddenlyGiovanni
				ariaLabel="Navigate to blog page"
				hrefUrl={avatarAssetUrl}
				to="/blog"
			/>

			<NavigationMenuToggle
				aria-controls="primary-navigation"
				className={cn('block md:hidden', '  right-4 z-40')}
				isSelected={value}
				onPress={toggle}
			/>

			<nav aria-label="mobile navigation">
				<menu
					className={cn(
						[
							'inset-y-0',
							'left-[20%]',
							'right-0',
							'z-auto',
							'px-8',
							'py-12',
							'md:h-full',
							'md:p-0',
						],
						['fixed', 'md:static'],
						['flex', 'justify-between', 'gap-2'],
						['flex-col', 'items-center', 'md:flex-row', 'md:items-center'],
						[
							'bg-slate-700/20',
							'shadow-2xl',
							'backdrop-blur-xl',
							'md:bg-inherit',
							'md:shadow-none',
							'md:backdrop-filter-none',
						],
						[
							'transition-transform',
							'duration-300',
							'ease-in-out',
							'md:transition-none',
						],
						value ? ['translate-x-0', 'md:translate-x-0'] : 'translate-x-full',
					)}
					id="primary-navigation"
				>
					<li>
						<NavLink
							prefetch="intent"
							tabIndex={0}
							to="/"
						>
							ABOUT ME
						</NavLink>
					</li>
					<li>
						<NavLink
							prefetch="intent"
							tabIndex={0}
							to="/blog"
						>
							BLOG
						</NavLink>
					</li>
					<li>
						<NavLink
							aria-disabled
							prefetch="intent"
							tabIndex={0}
							to="/reading-journal"
						>
							READING JOURNAL
						</NavLink>
					</li>
					<li>
						<NavLink
							prefetch="intent"
							tabIndex={0}
							to="/resume"
						>
							RÉSUMÉ
						</NavLink>
					</li>
				</menu>
			</nav>
		</Layout.Header>
	)
}
