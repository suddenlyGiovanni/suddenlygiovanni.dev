import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Large = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
	({ className, children, ...props }, ref) => (
		<div className={cn('text-lg', 'font-semibold', className)} ref={ref} {...props}>
			{children}
		</div>
	),
)
Large.displayName = 'Large'
