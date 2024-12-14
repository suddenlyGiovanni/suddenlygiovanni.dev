import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const H4: FC<ComponentPropsWithRef<'h4'>> = ({ className, children, ref, ...props }) => (
	<h4
		className={clsx('scroll-m-20 font-semibold text-xl tracking-tight', className)}
		ref={ref}
		{...props}
	>
		{children}
	</h4>
)
H4.displayName = 'H4'
