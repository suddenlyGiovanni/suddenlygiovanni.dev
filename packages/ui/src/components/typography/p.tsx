import { clsx } from '@/lib/utils.ts'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

export const P = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<p className={clsx('leading-7', '[&:not(:first-child)]:mt-6', className)} ref={ref} {...props}>
			{children}
		</p>
	),
)
P.displayName = 'P'
