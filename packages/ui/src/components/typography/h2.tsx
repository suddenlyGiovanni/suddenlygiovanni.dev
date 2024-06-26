import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const H2 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h2'>>(
	({ className, children, ...props }, ref) => (
		<h2
			className={clsx(
				'scroll-m-20',
				'border-b',
				'pb-2',
				'text-3xl',
				'font-semibold',
				'tracking-tight',
				'first:mt-0',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</h2>
	),
)
H2.displayName = 'H2'
