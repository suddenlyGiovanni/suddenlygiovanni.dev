import { Slot } from '@radix-ui/react-slot'
import type { ComponentPropsWithRef, FC } from 'react'

import { type VariantProps, clsx, cva } from '../lib/utils.ts'

const buttonVariants = cva(
	clsx(
		'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	),
	{
		variants: {
			variant: {
				default: clsx('bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'),
				destructive: clsx(
					'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
				),
				outline: clsx(
					'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
				),
				secondary: clsx('bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80'),
				ghost: clsx('hover:bg-accent hover:text-accent-foreground'),
				link: clsx('text-primary underline-offset-4 hover:underline'),
			},
			size: {
				default: clsx('h-9 px-4 py-2'),
				sm: clsx('h-8 rounded-md px-3 text-xs'),
				lg: clsx('h-10 rounded-md px-8'),
				icon: clsx('h-9 w-9'),
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends ComponentPropsWithRef<'button'>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button: FC<ButtonProps> = ({ className, variant, size, ref, asChild = false, ...props }) => {
	const Comp = asChild ? Slot : 'button'
	return (
		<Comp
			className={clsx(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	)
}
Button.displayName = 'Button'

export {
	Button,
	// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
	buttonVariants,
}
