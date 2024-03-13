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
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	type HTMLAttributes,
	type ReactElement,
	forwardRef,
} from 'react'
import { clsx } from '~/lib/utils.ts'

const DropdownMenu = Root
const DropdownMenuTrigger = Trigger
const DropdownMenuGroup = Group
const DropdownMenuPortal = Portal
const DropdownMenuSub = Sub
const DropdownMenuRadioGroup = RadioGroup

const DropdownMenuSubTrigger = forwardRef<
	ElementRef<typeof SubTrigger>,
	ComponentPropsWithoutRef<typeof SubTrigger> & {
		inset?: boolean
	}
>(({ className, inset, children, ...props }, ref) => (
	<SubTrigger
		className={clsx(
			'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent',
			inset && 'pl-8',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto h-4 w-4" />
	</SubTrigger>
))
DropdownMenuSubTrigger.displayName = SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
	ElementRef<typeof SubContent>,
	ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
	<SubContent
		className={clsx(
			'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
			className,
		)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuSubContent.displayName = SubContent.displayName

const DropdownMenuContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<DropdownMenuPortal>
		<Content
			className={clsx(
				'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
				'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in',
				className,
			)}
			ref={ref}
			sideOffset={sideOffset}
			{...props}
		/>
	</DropdownMenuPortal>
))
DropdownMenuContent.displayName = Content.displayName

const DropdownMenuItem = forwardRef<
	ElementRef<typeof Item>,
	ComponentPropsWithoutRef<typeof Item> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<Item
		className={clsx(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50',
			inset && 'pl-8',
			className,
		)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuItem.displayName = Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
	ElementRef<typeof CheckboxItem>,
	ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<CheckboxItem
		{...(checked ? { checked } : {})}
		className={clsx(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50',
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
))
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<
	ElementRef<typeof RadioItem>,
	ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
	<RadioItem
		className={clsx(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50',
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
))
DropdownMenuRadioItem.displayName = RadioItem.displayName

const DropdownMenuLabel = forwardRef<
	ElementRef<typeof Label>,
	ComponentPropsWithoutRef<typeof Label> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<Label
		className={clsx('px-2 py-1.5 font-semibold text-sm', inset && 'pl-8', className)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuLabel.displayName = Label.displayName

const DropdownMenuSeparator = forwardRef<
	ElementRef<typeof Separator>,
	ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
	<Separator className={clsx('-mx-1 my-1 h-px bg-muted', className)} ref={ref} {...props} />
))
DropdownMenuSeparator.displayName = Separator.displayName

function DropdownMenuShortcut({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>): ReactElement {
	return (
		<span className={clsx('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
	)
}
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
