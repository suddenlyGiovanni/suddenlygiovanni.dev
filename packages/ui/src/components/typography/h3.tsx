import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const H3 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h3'>>(
	({ className, children, ...props }, ref) => (
		<h3
			className={clsx('scroll-m-20 font-semibold text-2xl tracking-tight', className)}
			ref={ref}
			{...props}
		>
			{children}
		</h3>
	),
)
H3.displayName = 'H3'
