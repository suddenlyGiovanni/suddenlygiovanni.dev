import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Blockquote = forwardRef<HTMLQuoteElement, ComponentPropsWithoutRef<'blockquote'>>(
	({ className, children, ...props }, ref) => (
		<blockquote
			className={clsx('mt-6 border-l-2 pl-6 italic', className)}
			ref={ref}
			{...props}
		>
			{children}
		</blockquote>
	),
)
Blockquote.displayName = 'Blockquote'
