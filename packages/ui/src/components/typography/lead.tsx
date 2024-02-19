import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Lead = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<h1
			className={cn('text-xl', 'text-muted-foreground', className)}
			ref={ref}
			{...props}
		>
			{children}
		</h1>
	),
)
Lead.displayName = 'Lead'
