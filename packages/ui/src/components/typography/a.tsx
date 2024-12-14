import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const A: FC<ComponentPropsWithRef<'a'>> = ({ className, children, ref, ...props }) => (
	<a
		className={clsx('font-medium text-primary underline underline-offset-4', className)}
		ref={ref}
		{...props}
	>
		{children}
	</a>
)
A.displayName = 'A'
