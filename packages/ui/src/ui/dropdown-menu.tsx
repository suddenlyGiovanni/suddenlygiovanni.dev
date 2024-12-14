import {
	CheckboxItem,
	Content,
	Group,
	Item,
	ItemIndicator,
	Label,
	Portal,
	RadioGroup,
	RadioItem,
	Root,
	Separator,
	Sub,
	SubContent,
	SubTrigger,
	Trigger,
} from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons'
import type { ComponentPropsWithRef, CustomComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

const DropdownMenu = Root
const DropdownMenuTrigger = Trigger
const DropdownMenuGroup = Group
const DropdownMenuPortal = Portal
const DropdownMenuSub = Sub
const DropdownMenuRadioGroup = RadioGroup

const DropdownMenuSubTrigger: FC<
	CustomComponentPropsWithRef<typeof SubTrigger> & {
		inset?: boolean
	}
> = ({ className, inset, children, ref, ...props }) => (
	<SubTrigger
		className={clsx(
			'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent',
			inset && 'pl-8',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto h-4 w-4" />
	</SubTrigger>
)
DropdownMenuSubTrigger.displayName = SubTrigger.displayName

const DropdownMenuSubContent: FC<CustomComponentPropsWithRef<typeof SubContent>> = ({
	className,
	ref,
	...props
}) => (
	<SubContent
		className={clsx(
			'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
			className,
		)}
		ref={ref}
		{...props}
	/>
)
DropdownMenuSubContent.displayName = SubContent.displayName

const DropdownMenuContent: FC<ComponentPropsWithRef<typeof Content>> = ({
	className,
	sideOffset = 4,
	ref,
	...props
}) => (
	<DropdownMenuPortal>
		<Content
			className={clsx(
				'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
				className,
			)}
			ref={ref}
			sideOffset={sideOffset}
			{...props}
		/>
	</DropdownMenuPortal>
)
DropdownMenuContent.displayName = Content.displayName

const DropdownMenuItem: FC<
	CustomComponentPropsWithRef<typeof Item> & {
		inset?: boolean
	}
> = ({ className, inset, ref, ...props }) => (
	<Item
		className={clsx(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
			inset && 'pl-8',
			className,
		)}
		ref={ref}
		{...props}
	/>
)
DropdownMenuItem.displayName = Item.displayName

const DropdownMenuCheckboxItem: FC<CustomComponentPropsWithRef<typeof CheckboxItem>> = ({
	className,
	children,
	checked,
	ref,
	...props
}) => (
	<CheckboxItem
		{...(checked ? { checked } : {})}
		className={clsx(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
			className,
		)}
		ref={ref}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<CheckIcon className="h-4 w-4" />
			</ItemIndicator>
		</span>
		{children}
	</CheckboxItem>
)
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName

const DropdownMenuRadioItem: FC<ComponentPropsWithRef<typeof RadioItem>> = ({
	className,
	children,
	ref,
	...props
}) => (
	<RadioItem
		className={clsx(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
			className,
		)}
		ref={ref}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<DotFilledIcon className="h-4 w-4 fill-current" />
			</ItemIndicator>
		</span>
		{children}
	</RadioItem>
)
DropdownMenuRadioItem.displayName = RadioItem.displayName

const DropdownMenuLabel: FC<
	CustomComponentPropsWithRef<typeof Label> & {
		inset?: boolean
	}
> = ({ className, inset, ref, ...props }) => (
	<Label
		className={clsx('px-2 py-1.5 font-semibold text-sm', inset && 'pl-8', className)}
		ref={ref}
		{...props}
	/>
)
DropdownMenuLabel.displayName = Label.displayName

const DropdownMenuSeparator: FC<CustomComponentPropsWithRef<typeof Separator>> = ({
	className,
	ref,
	...props
}) => (
	<Separator
		className={clsx('-mx-1 my-1 h-px bg-muted', className)}
		ref={ref}
		{...props}
	/>
)
DropdownMenuSeparator.displayName = Separator.displayName

const DropdownMenuShortcut: FC<ComponentPropsWithRef<'span'>> = ({ className, ref, ...props }) => (
	<span
		className={clsx('ml-auto text-xs tracking-widest opacity-60', className)}
		ref={ref}
		{...props}
	/>
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
}
