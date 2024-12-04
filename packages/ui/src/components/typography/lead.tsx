import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Lead = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'p'>>(
	({ className, children, ...props }, ref) => (
		<h1
			className={clsx('text-muted-foreground text-xl', className)}
			ref={ref}
			{...props}
		>
			{children}
		</h1>
	),
)
Lead.displayName = 'Lead'
