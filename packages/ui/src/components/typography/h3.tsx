import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const H3 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h3'>>(
	({ className, children, ...props }, ref) => (
		<h3
			className={cn('scroll-m-20', 'text-2xl', 'font-semibold', 'tracking-tight', className)}
			ref={ref}
			{...props}
		>
			{children}
		</h3>
	),
)
H3.displayName = 'H3'
