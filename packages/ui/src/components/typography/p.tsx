import type { ComponentPropsWithRef, FC } from 'react'
import { clsx } from '#lib/utils.ts'

export const P: FC<ComponentPropsWithRef<'p'>> = ({ className, children, ref, ...props }) => (
	<p
		className={clsx('not-first:mt-6 leading-7', className)}
		ref={ref}
		{...props}
	>
		{children}
	</p>
)
P.displayName = 'P'
