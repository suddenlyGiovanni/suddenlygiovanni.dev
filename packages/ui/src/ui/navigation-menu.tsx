import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
	Content,
	Indicator,
	Item,
	Link,
	List,
	Root,
	Sub,
	Trigger,
	Viewport,
} from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { clsx, cva } from '../lib/utils.ts'

const NavigationMenu = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
	({ className, children, ...props }, ref) => (
		<Root
			className={clsx('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
			ref={ref}
			{...props}
		>
			{children}
			<NavigationMenuViewport />
		</Root>
	),
)
NavigationMenu.displayName = Root.displayName

const NavigationMenuList = forwardRef<
	ElementRef<typeof List>,
	ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
	<List
		className={clsx('group flex flex-1 list-none items-center justify-center space-x-1', className)}
		ref={ref}
		{...props}
	/>
))
NavigationMenuList.displayName = List.displayName

const NavigationMenuItem = Item

const navigationMenuTriggerStyle = cva(
	clsx([
		'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50',
	]),
)

const NavigationMenuTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
	<Trigger
		className={clsx(navigationMenuTriggerStyle(), 'group', className)}
		ref={ref}
		{...props}
	>
		{children}{' '}
		<ChevronDownIcon
			aria-hidden="true"
			className={clsx(
				'relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180',
			)}
		/>
	</Trigger>
))
NavigationMenuTrigger.displayName = Trigger.displayName

const NavigationMenuContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
	<Content
		className={clsx(
			'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto',
			className,
		)}
		ref={ref}
		{...props}
	/>
))
NavigationMenuContent.displayName = Content.displayName

const NavigationMenuLink = Link

const NavigationMenuViewport = forwardRef<
	ElementRef<typeof Viewport>,
	ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
	<div className={clsx('absolute top-full left-0 flex justify-center')}>
		<Viewport
			className={clsx(
				'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-sm data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]',
				className,
			)}
			ref={ref}
			{...props}
		/>
	</div>
))
NavigationMenuViewport.displayName = Viewport.displayName

const NavigationMenuIndicator = forwardRef<
	ElementRef<typeof Indicator>,
	ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, ref) => (
	<Indicator
		className={clsx(
			'data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in',
			className,
		)}
		ref={ref}
		{...props}
	>
		<div
			className={clsx('relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md')}
		/>
	</Indicator>
))
NavigationMenuIndicator.displayName = Indicator.displayName

const NavigationMenuSub = Sub
NavigationMenuSub.displayName = Sub.displayName

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuSub,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
}
