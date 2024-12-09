import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import type { ComponentPropsWithRef, CustomComponentPropsWithRef, FC } from 'react'

import { clsx } from '../lib/utils.ts'

const Accordion = Root
Accordion.displayName = Root.displayName
const AccordionHeader = Header
AccordionHeader.displayName = Header.displayName

const AccordionItem: FC<ComponentPropsWithRef<typeof Item>> = ({ className, ref, ...props }) => (
	<Item
		className={clsx('border-b', className)}
		ref={ref}
		{...props}
	/>
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger: FC<CustomComponentPropsWithRef<typeof Trigger>> = ({
	className,
	children,
	ref,
	...props
}) => (
	<Header className="flex">
		<Trigger
			className={clsx(
				'flex flex-1 items-center justify-between py-4 text-left font-medium text-sm transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
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
)
AccordionTrigger.displayName = Trigger.displayName

const AccordionContent: FC<CustomComponentPropsWithRef<typeof Content>> = ({
	className,
	children,
	ref,
	...props
}) => (
	<Content
		className={clsx(
			'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
		)}
		ref={ref}
		{...props}
	>
		<div className={clsx('pt-0 pb-4', className)}>{children}</div>
	</Content>
)
AccordionContent.displayName = Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionHeader }

export { Trigger } from '@radix-ui/react-accordion'
