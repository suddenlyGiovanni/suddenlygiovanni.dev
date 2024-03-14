import { clsx } from '@/lib/utils.ts'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

export const A = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
	({ className, children, ...props }, ref) => (
		<a
			className={clsx('font-medium', 'text-primary', 'underline', 'underline-offset-4', className)}
			ref={ref}
			{...props}
		>
			{children}
		</a>
	),
)
A.displayName = 'A'
