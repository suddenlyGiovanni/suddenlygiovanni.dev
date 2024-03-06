import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Muted = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<p className={cn('text-sm', 'text-muted-foreground', className)} ref={ref} {...props}>
			{children}
		</p>
	),
)
Muted.displayName = 'Muted'
