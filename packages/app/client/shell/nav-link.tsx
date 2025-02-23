import type { ReactElement } from 'react'
import { type NavLinkProps, NavLink as UnstyledNavLink } from 'react-router'

import { clsx } from '@repo/ui/lib/utils.ts'

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

export function NavLink({
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
