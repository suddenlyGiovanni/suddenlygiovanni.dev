import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Ul = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(
	({ className, children, ...props }, ref) => (
		<ul className={cn('my-6', 'ml-6', 'list-disc', '[&>li]:mt-2', className)} ref={ref} {...props}>
			{children}
		</ul>
	),
)
Ul.displayName = 'Ul'
