import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const P = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<p className={cn('leading-7', '[&:not(:first-child)]:mt-6', className)} ref={ref} {...props}>
			{children}
		</p>
	),
)
P.displayName = 'P'
