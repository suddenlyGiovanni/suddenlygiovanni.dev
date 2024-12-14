import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Large: FC<ComponentPropsWithRef<'div'>> = ({ className, children, ref, ...props }) => (
	<div
		className={clsx('font-semibold text-lg', className)}
		ref={ref}
		{...props}
	>
		{children}
	</div>
)
Large.displayName = 'Large'
