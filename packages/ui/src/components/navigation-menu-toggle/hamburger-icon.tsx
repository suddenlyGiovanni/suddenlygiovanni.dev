import type { ComponentProps, ReactElement } from 'react'

import { clsx } from '../../lib/utils.ts'

const baseClasses = clsx('absolute h-0.5 w-6 transition-all duration-250 ease-in-out')

export function HamburgerIcon({
	isSelected,
	className,
	...props
}: Omit<ComponentProps<'div'>, 'children'> & {
	readonly isSelected: boolean
}): ReactElement {
	return (
		<div
			className={clsx(
				baseClasses,
				isSelected && 'bg-transparent',
				!isSelected && 'bg-foreground',
				className,
			)}
			{...props}
		>
			<div
				className={clsx(baseClasses, '-translate-y-2 transform bg-foreground', {
					'translate-y-0 rotate-45': isSelected,
				})}
			/>
			<div
				className={clsx(baseClasses, 'translate-y-2 transform bg-foreground', {
					'-rotate-45 translate-y-0': isSelected,
				})}
			/>
		</div>
	)
}
