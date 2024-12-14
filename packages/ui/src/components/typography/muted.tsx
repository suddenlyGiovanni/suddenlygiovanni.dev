import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Muted: FC<ComponentPropsWithRef<'p'>> = ({ className, children, ref, ...props }) => (
	<p
		className={clsx('text-muted-foreground text-sm', className)}
		ref={ref}
		{...props}
	>
		{children}
	</p>
)
Muted.displayName = 'Muted'
