import { Slot } from '@radix-ui/react-slot'
import { type ComponentProps, type ElementRef, forwardRef } from 'react'
import { clsx } from '../lib/utils.ts'

export const Skeleton = forwardRef<
	ElementRef<'div'>,
	ComponentProps<'div'> & {
		asChild?: boolean
	}
>(({ className, asChild = false, ...props }, forwardedRef) => {
	const Component = asChild ? Slot : 'div'
	return (
		<Component
			className={clsx('animate-pulse rounded-md bg-primary/10', className)}
			ref={forwardedRef}
			{...props}
		/>
	)
})
Skeleton.displayName = 'Skeleton'
