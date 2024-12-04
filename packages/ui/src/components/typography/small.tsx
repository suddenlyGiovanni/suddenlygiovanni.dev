import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Small = forwardRef<HTMLElement, ComponentPropsWithoutRef<'small'>>(
	({ className, children, ...props }, ref) => (
		<small
			className={clsx('font-medium text-sm leading-none', className)}
			ref={ref}
			{...props}
		>
			{children}
		</small>
	),
)
Small.displayName = 'Small'
