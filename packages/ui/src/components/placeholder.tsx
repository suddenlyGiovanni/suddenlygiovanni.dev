import { type JSX, forwardRef } from 'react'
import { cn } from '../lib/utils'

const name = 'Placeholder'
export const Placeholder = forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>(
	({ children = 'Placeholder Content', className, ...rest }, ref) => (
		<div
			className={cn(
				'flex h-full w-full items-center justify-center border-2 border-dashed border-blue-500 bg-gray-200 p-4 text-xl text-gray-500',
				className,
			)}
			data-testid={name}
			ref={ref}
			{...rest}
		>
			{children}
		</div>
	),
)
Placeholder.displayName = name
