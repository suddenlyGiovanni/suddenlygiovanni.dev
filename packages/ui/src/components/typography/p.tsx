import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const P = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<p
			className={clsx('not-first:mt-6 leading-7', className)}
			ref={ref}
			{...props}
		>
			{children}
		</p>
	),
)
P.displayName = 'P'
