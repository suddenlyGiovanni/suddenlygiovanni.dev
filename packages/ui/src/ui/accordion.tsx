import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { clsx } from '../lib/utils.ts'

const Accordion = Root
Accordion.displayName = Root.displayName
const AccordionHeader = Header
AccordionHeader.displayName = Header.displayName

const AccordionItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
	({ className, ...props }, ref) => (
		<Item
			className={clsx('border-b', className)}
			ref={ref}
			{...props}
		/>
	),
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
	<Header className="flex">
		<Trigger
			className={clsx(
				'flex flex-1 items-center justify-between',
				'py-4',
				'font-medium text-sm hover:underline',
				'transition-all [&[data-state=open]>svg]:rotate-180',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
			<ChevronDownIcon
				className={clsx('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200')}
			/>
		</Trigger>
	</Header>
))
AccordionTrigger.displayName = Trigger.displayName

const AccordionContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
	<Content
		className={clsx(
			'overflow-hidden',
			'text-sm',
			'data-[state=closed]:animate-accordion-up',
			'data-[state=open]:animate-accordion-down',
		)}
		ref={ref}
		{...props}
	>
		<div className={clsx('pt-0 pb-4', className)}>{children}</div>
	</Content>
))
AccordionContent.displayName = Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionHeader, Trigger }
