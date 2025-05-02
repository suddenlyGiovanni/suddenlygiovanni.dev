import { Slot } from '@radix-ui/react-slot'
import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

const Root: FC<ComponentPropsWithRef<'div'> & { asChild?: boolean }> = ({
	className,
	asChild = false,
	ref,
	...props
}) => {
	const Component = asChild ? Slot : 'div'
	return (
		<Component
			className={clsx('rounded-xl border bg-card text-card-foreground shadow-sm', className)}
			ref={ref}
			{...props}
		/>
	)
}
Root.displayName = 'Card.Root'

const Header: FC<ComponentPropsWithRef<'div'>> = ({ className, ref, ...props }) => (
	<div
		className={clsx('flex flex-col space-y-1.5 p-6', className)}
		ref={ref}
		{...props}
	/>
)
Header.displayName = 'Card.Header'

const Title: FC<ComponentPropsWithRef<'h3'>> = ({ className, ref, ...props }) => (
	<h3
		className={clsx('font-semibold leading-none tracking-tight', className)}
		ref={ref}
		{...props}
	/>
)
Title.displayName = 'Card.Title'

const Description: FC<ComponentPropsWithRef<'p'>> = ({ className, ref, ...props }) => (
	<p
		className={clsx('text-muted-foreground text-sm', className)}
		ref={ref}
		{...props}
	/>
)
Description.displayName = 'Card.Description'

const Content: FC<ComponentPropsWithRef<'div'>> = ({ className, ref, ...props }) => (
	<div
		className={clsx('p-6 pt-0', className)}
		ref={ref}
		{...props}
	/>
)
Content.displayName = 'Card.Content'

const Footer: FC<ComponentPropsWithRef<'div'>> = ({ className, ref, ...props }) => (
	<div
		className={clsx('flex items-center p-6 pt-0', className)}
		ref={ref}
		{...props}
	/>
)
Footer.displayName = 'Card.Footer'

export const Card = {
	Content,
	Description,
	Footer,
	Header,
	Root,
	Title,
} as const
