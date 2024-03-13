import { Root } from '@radix-ui/react-separator'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { clsx } from '~/lib/utils.ts'

export const Separator = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
	({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
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
	),
)
Separator.displayName = Root.displayName
