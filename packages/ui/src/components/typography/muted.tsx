import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Muted = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<p
			className={clsx('text-sm', 'text-muted-foreground', className)}
			ref={ref}
			{...props}
		>
			{children}
		</p>
	),
)
Muted.displayName = 'Muted'
