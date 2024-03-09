import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from '~/lib/utils.ts'

export const H4 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h4'>>(
	({ className, children, ...props }, ref) => (
		<h4
			className={clsx('scroll-m-20', 'text-xl', 'font-semibold', 'tracking-tight', className)}
			ref={ref}
			{...props}
		>
			{children}
		</h4>
	),
)
H4.displayName = 'H4'
