import { type ElementType, forwardRef } from 'react'

import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from '../lib/polymorphic-component-prop.tsx'
import { clsx } from '../lib/utils.ts'

export const Skeleton = forwardRef(
	<C extends ElementType = 'div'>(
		{ className, as, ...props }: PolymorphicComponentPropWithRef<C>,
		ref: PolymorphicRef<C>,
	) => {
		const Component = as ?? 'div'
		return (
			<Component
				className={clsx('animate-pulse', 'rounded-md', 'bg-primary/10', className)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Skeleton.displayName = 'Skeleton'
