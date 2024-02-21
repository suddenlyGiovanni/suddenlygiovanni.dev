import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../lib/utils'

export const Skeleton = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
	({ className, ...props }, ref) => (
		<div
			className={cn('animate-pulse', 'rounded-md', 'bg-primary/10', className)}
			ref={ref}
			{...props}
		/>
	),
)
Skeleton.displayName = 'Skeleton'
