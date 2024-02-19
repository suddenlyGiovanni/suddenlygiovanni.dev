import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const A = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
	({ className, children, ...props }, ref) => (
		<a
			className={cn(
				'font-medium',
				'text-primary',
				'underline',
				'underline-offset-4',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</a>
	),
)
A.displayName = 'A'
