import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

const name = 'Placeholder'
export const Placeholder: FC<ComponentPropsWithRef<'div'>> = ({
	children = 'Placeholder Content',
	className,
	ref,
	...rest
}) => (
	<div
		className={clsx(
			'flex h-full w-full items-center justify-center border-2 border-blue-500 border-dashed bg-gray-200 p-4 text-gray-500 text-xl',
			className,
		)}
		data-testid={name}
		ref={ref}
		{...rest}
	>
		{children}
	</div>
)
Placeholder.displayName = name
