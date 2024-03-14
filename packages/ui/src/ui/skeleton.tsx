import { clsx } from '@/lib/utils.ts'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

export const Skeleton = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
	({ className, ...props }, ref) => (
		<div
			className={clsx('animate-pulse', 'rounded-md', 'bg-primary/10', className)}
			ref={ref}
			{...props}
		/>
	),
)
Skeleton.displayName = 'Skeleton'
