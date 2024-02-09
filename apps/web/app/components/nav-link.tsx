import { type NavLinkProps, NavLink as UnstyledNavLink } from '@remix-run/react'
import type { JSX } from 'react'

export function NavLink({ children, ...props }: Omit<NavLinkProps, 'className'>): JSX.Element {
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
