import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from '@/lib/utils.ts'

export const Code = forwardRef<HTMLElement, ComponentPropsWithoutRef<'code'>>(
	({ className, children, ...props }, ref) => (
		<code
			className={clsx(
				'relative',
				'rounded',
				'bg-muted',
				'px-[0.3rem]',
				'py-[0.2rem]',
				'font-mono',
				'text-sm',
				'font-semibold',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</code>
	),
)
Code.displayName = 'Code'
