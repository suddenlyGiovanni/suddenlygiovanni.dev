import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Blockquote: FC<ComponentPropsWithRef<'blockquote'>> = ({ className, children, ref, ...props }) => (
	<blockquote
		className={clsx('mt-6 border-l-2 pl-6 italic', className)}
		ref={ref}
		{...props}
	>
		{children}
	</blockquote>
)
Blockquote.displayName = 'Blockquote'
