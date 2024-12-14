import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Small: FC<ComponentPropsWithRef<'small'>> = ({
	className,
	children,
	ref,
	...props
}) => (
	<small
		className={clsx('font-medium text-sm leading-none', className)}
		ref={ref}
		{...props}
	>
		{children}
	</small>
)
Small.displayName = 'Small'
