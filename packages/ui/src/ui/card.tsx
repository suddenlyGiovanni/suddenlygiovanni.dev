import { Slot } from '@radix-ui/react-slot'
import type { ComponentPropsWithRef, FC } from 'react'
import { clsx } from '../lib/utils.ts'

const Root: FC<ComponentPropsWithRef<'div'> & { asChild?: boolean }> = ({
	className,
	asChild = false,
	ref,
	...props
}) => {
	const Component = asChild ? Slot : 'div'
	return (
		<Component
			ref={ref}
			className={clsx('rounded-xl border bg-card text-card-foreground shadow-sm', className)}
			{...props}
		/>
	)
}
Root.displayName = 'Card.Root'

const Header: FC<ComponentPropsWithRef<'div'>> = ({ className, ref, ...props }) => (
	<div
		ref={ref}
		className={clsx('flex flex-col space-y-1.5 p-6', className)}
		{...props}
	/>
)
Header.displayName = 'Card.Header'

const Title: FC<ComponentPropsWithRef<'h3'>> = ({ className, ref, ...props }) => (
	<h3
		ref={ref}
		className={clsx('font-semibold leading-none tracking-tight', className)}
		{...props}
	/>
)
Title.displayName = 'Card.Title'

const Description: FC<ComponentPropsWithRef<'p'>> = ({ className, ref, ...props }) => (
	<p
		ref={ref}
		className={clsx('text-muted-foreground text-sm', className)}
		{...props}
	/>
)
Description.displayName = 'Card.Description'

const Content: FC<ComponentPropsWithRef<'div'>> = ({ className, ref, ...props }) => (
	<div
		ref={ref}
		className={clsx('p-6 pt-0', className)}
		{...props}
	/>
)
Content.displayName = 'Card.Content'

const Footer: FC<ComponentPropsWithRef<'div'>> = ({ className, ref, ...props }) => (
	<div
		ref={ref}
		className={clsx('flex items-center p-6 pt-0', className)}
		{...props}
	/>
)
Footer.displayName = 'Card.Footer'

export const Card = {
	Root,
	Header,
	Footer,
	Title,
	Description,
	Content,
} as const
