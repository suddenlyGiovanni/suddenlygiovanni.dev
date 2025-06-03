import type { ComponentPropsWithRef, FC } from 'react'

import { clsx, cva, type VariantProps } from '#lib/utils.ts'

export const badgeVariants = cva(
	'inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		defaultVariants: {
			variant: 'default',
		},
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
				destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
				outline: 'text-foreground',
				secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
			},
		},
	},
)

export interface BadgeProps extends ComponentPropsWithRef<'div'>, VariantProps<typeof badgeVariants> {}

export const Badge: FC<BadgeProps> = ({ className, variant, ref, ...props }) => (
	<div
		className={clsx(badgeVariants({ variant }), className)}
		ref={ref}
		{...props}
	/>
)
Badge.displayName = 'Badge'
