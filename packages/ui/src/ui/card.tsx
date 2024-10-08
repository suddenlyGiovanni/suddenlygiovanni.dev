import { type ElementType, type HTMLAttributes, forwardRef } from 'react'

import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from '../lib/polymorphic-component-prop.tsx'
import { clsx } from '../lib/utils.ts'

const Root = forwardRef(
	<C extends ElementType = 'div'>(
		{ className, as, ...props }: PolymorphicComponentPropWithRef<C>,
		ref: PolymorphicRef<C>,
	) => {
		const Component = as ?? 'div'
		return (
			<Component
				ref={ref}
				className={clsx('rounded-xl border bg-card text-card-foreground shadow', className)}
				{...props}
			/>
		)
	},
)
Root.displayName = 'Card.Root'

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx('flex flex-col space-y-1.5 p-6', className)}
			{...props}
		/>
	),
)
Header.displayName = 'Card.Header'

const Title = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h3
			ref={ref}
			className={clsx('font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	),
)
Title.displayName = 'Card.Title'

const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={clsx('text-muted-foreground text-sm', className)}
			{...props}
		/>
	),
)
Description.displayName = 'Card.Description'

const Content = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx('p-6 pt-0', className)}
			{...props}
		/>
	),
)
Content.displayName = 'Card.Content'

const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	),
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
