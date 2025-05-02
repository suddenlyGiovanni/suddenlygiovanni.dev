import type { Meta } from '@storybook/react'
import type { ComponentPropsWithRef, FC, ReactElement } from 'react'
import { Link } from 'react-router'

import { Icons } from '#components/icons/icons.tsx'
import { clsx } from '#lib/utils.ts'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '#ui/navigation-menu.tsx'

const meta: Meta = {
	component: NavigationMenu,
}

const components: { title: string; href: string; description: string }[] = [
	{
		description:
			'A modal dialog that interrupts the user with important content and expects a response.',
		href: '/docs/primitives/alert-dialog',
		title: 'Alert Dialog',
	},
	{
		description: 'For sighted users to preview content available behind a link.',
		href: '/docs/primitives/hover-card',
		title: 'Hover Card',
	},
	{
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
		href: '/docs/primitives/progress',
		title: 'Progress',
	},
	{
		description: 'Visually or semantically separates content.',
		href: '/docs/primitives/scroll-area',
		title: 'Scroll-area',
	},
	{
		description:
			'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
		href: '/docs/primitives/tabs',
		title: 'Tabs',
	},
	{
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
		href: '/docs/primitives/tooltip',
		title: 'Tooltip',
	},
]

export function Default(): ReactElement {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul
							className={clsx('grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]')}
						>
							<li className="row-span-3">
								<NavigationMenuLink asChild={true}>
									<a
										className={clsx(
											'flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md',
										)}
										href="/"
									>
										<Icons.globe className="h-6 w-6" />
										<div className="mt-4 mb-2 font-medium text-lg">shadcn/ui</div>
										<p className="text-muted-foreground text-sm leading-tight">
											Beautifully designed components built with Radix UI and Tailwind CSS.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem
								href="/docs"
								title="Introduction"
							>
								Re-usable components built using Radix UI and Tailwind CSS.
							</ListItem>
							<ListItem
								href="/docs/installation"
								title="Installation"
							>
								How to install dependencies and structure your app.
							</ListItem>
							<ListItem
								href="/docs/primitives/typography"
								title="Typography"
							>
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul
							className={clsx('grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]')}
						>
							{components.map(component => (
								<ListItem
									href={component.href}
									key={component.title}
									title={component.title}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to="/docs">
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Documentation
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem: FC<ComponentPropsWithRef<'a'>> = ({
	className,
	title,
	children,
	ref,
	...props
}) => {
	return (
		<li>
			<NavigationMenuLink asChild={true}>
				<a
					className={clsx(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					ref={ref}
					{...props}
				>
					<div className={clsx('text-sm', 'font-medium', 'leading-none')}>{title}</div>
					<p className={clsx('line-clamp-2', 'text-sm', 'leading-snug', 'text-muted-foreground')}>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
}
ListItem.displayName = 'ListItem'

export default meta
