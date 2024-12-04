import { type HTMLAttributes, forwardRef } from 'react'

import { type VariantProps, clsx, cva } from '../lib/utils.ts'

export const badgeVariants = cva(
	'inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
				outline: 'text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx(badgeVariants({ variant }), className)}
			{...props}
		/>
	),
)
Badge.displayName = 'Badge'
