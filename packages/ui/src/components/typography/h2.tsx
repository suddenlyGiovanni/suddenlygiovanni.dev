import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '../../lib/utils.ts'

export const H2: FC<ComponentPropsWithRef<'h2'>> = ({ className, children, ref, ...props }) => (
	<h2
		className={clsx(
			'scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
	</h2>
)
H2.displayName = 'H2'
