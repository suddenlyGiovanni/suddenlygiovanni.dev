import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const H1: FC<ComponentPropsWithRef<'h1'>> = ({ className, children, ref, ...props }) => (
	<h1
		className={clsx('scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl', className)}
		ref={ref}
		{...props}
	>
		{children}
	</h1>
)
H1.displayName = 'H1'
