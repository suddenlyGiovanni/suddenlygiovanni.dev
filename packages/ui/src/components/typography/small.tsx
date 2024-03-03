import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Small = forwardRef<HTMLElement, ComponentPropsWithoutRef<'small'>>(
	({ className, children, ...props }, ref) => (
		<small
			className={cn('text-sm', 'font-medium', 'leading-none', className)}
			ref={ref}
			{...props}
		>
			{children}
		</small>
	),
)
Small.displayName = 'Small'
