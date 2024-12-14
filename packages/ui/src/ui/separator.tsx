import { Root } from '@radix-ui/react-separator'
import type { CustomComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Separator: FC<CustomComponentPropsWithRef<typeof Root>> = ({
	className,
	orientation = 'horizontal',
	decorative = true,
	ref,
	...props
}) => (
	<Root
		className={clsx(
			'shrink-0 bg-border',
			orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
			className,
		)}
		decorative={decorative}
		orientation={orientation}
		ref={ref}
		{...props}
	/>
)
Separator.displayName = Root.displayName
