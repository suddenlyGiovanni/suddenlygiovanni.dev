import type { ComponentProps, ElementRef } from 'react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const HamburgerIcon = forwardRef<
	ElementRef<'div'>,
	Omit<ComponentProps<'div'>, 'children'> & { readonly isSelected: boolean }
>(({ isSelected, className, ...props }, ref) => (
	<div
		className={cn(
			'absolute',
			'w-6',
			'h-0.5',
			'transition-all',
			'duration-250',
			'ease-in-out',
			isSelected && 'bg-transparent',
			!isSelected && 'bg-black',
			className,
		)}
		ref={ref}
		{...props}
	>
		<div
			className={cn(
				[
					'absolute',
					'h-0.5',
					'w-6',
					'-translate-y-2',
					'transform',
					'bg-black',
					'transition-all',
					'ease-in-out',
					'duration-250',
				],
				{
					'translate-y-0 rotate-45': isSelected,
				},
			)}
		/>
		<div
			className={cn(
				[
					'absolute',
					'h-0.5',
					'w-6',
					'translate-y-2',
					'transform',
					'bg-black',
					'transition-all',
					'ease-in-out',
					'duration-250',
				],
				{
					'translate-y-0 -rotate-45': isSelected,
				},
			)}
		/>
	</div>
))
HamburgerIcon.displayName = 'HamburgerIcon'
