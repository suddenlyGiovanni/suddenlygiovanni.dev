import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Large = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
	({ className, children, ...props }, ref) => (
		<div
			className={clsx('text-lg', 'font-semibold', className)}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	),
)
Large.displayName = 'Large'
