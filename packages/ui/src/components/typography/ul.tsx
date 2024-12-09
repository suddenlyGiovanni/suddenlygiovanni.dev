import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Ul: FC<ComponentPropsWithRef<'ul'>> = ({ className, children, ref, ...props }) => (
	<ul
		className={clsx('my-6 ml-6 list-disc [&>li]:mt-2', className)}
		ref={ref}
		{...props}
	>
		{children}
	</ul>
)
Ul.displayName = 'Ul'
