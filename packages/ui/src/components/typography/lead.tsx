import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Lead: FC<ComponentPropsWithRef<'h1'>> = ({ className, children, ref, ...props }) => (
	<h1
		className={clsx('text-muted-foreground text-xl', className)}
		ref={ref}
		{...props}
	>
		{children}
	</h1>
)
Lead.displayName = 'Lead'
