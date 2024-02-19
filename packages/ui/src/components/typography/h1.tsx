import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const H1 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h1'>>(
	({ className, children, ...props }, ref) => (
		<h1
			className={cn(
				'scroll-m-20',
				'text-4xl',
				'font-extrabold',
				'tracking-tight',
				'lg:text-5xl',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</h1>
	),
)
H1.displayName = 'H1'
