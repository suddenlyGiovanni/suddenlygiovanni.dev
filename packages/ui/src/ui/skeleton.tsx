import { Slot } from '@radix-ui/react-slot'
import type { ComponentPropsWithRef, FC } from 'react'
import { clsx } from '../lib/utils.ts'

export const Skeleton: FC<
	ComponentPropsWithRef<'div'> & {
		asChild?: boolean
	}
> = ({ className, asChild = false, ref, ...props }) => {
	const Component = asChild ? Slot : 'div'
	return (
		<Component
			className={clsx('animate-pulse rounded-md bg-primary/10', className)}
			ref={ref}
			{...props}
		/>
	)
}
Skeleton.displayName = 'Skeleton'
