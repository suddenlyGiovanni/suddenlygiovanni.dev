import { clsx } from '@/lib/utils.ts'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

export const Large = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
	({ className, children, ...props }, ref) => (
		<div className={clsx('text-lg', 'font-semibold', className)} ref={ref} {...props}>
			{children}
		</div>
	),
)
Large.displayName = 'Large'
