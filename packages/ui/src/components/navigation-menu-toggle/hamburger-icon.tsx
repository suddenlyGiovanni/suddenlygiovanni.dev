import type { ComponentProps, ReactElement } from 'react'
import { cn } from '../../lib/utils'

const baseClasses = cn('absolute', 'w-6', 'h-0.5', 'transition-all', 'ease-in-out', 'duration-250')

export function HamburgerIcon({
	isSelected,
	className,
	...props
}: Omit<ComponentProps<'div'>, 'children'> & {
	readonly isSelected: boolean
}): ReactElement {
	return (
		<div
			className={cn(
				baseClasses,
				isSelected && 'bg-transparent',
				!isSelected && 'bg-foreground',
				className,
			)}
			{...props}
		>
			<div
				className={cn([baseClasses, '-translate-y-2', 'transform', 'bg-foreground'], {
					'translate-y-0 rotate-45': isSelected,
				})}
			/>
			<div
				className={cn([baseClasses, 'translate-y-2', 'transform', 'bg-foreground'], {
					'translate-y-0 -rotate-45': isSelected,
				})}
			/>
		</div>
	)
}
