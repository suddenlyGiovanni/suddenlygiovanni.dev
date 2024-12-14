import { CaretSortIcon } from '@radix-ui/react-icons'
import type { Meta } from '@storybook/react'
import { type ReactElement, useState } from 'react'

import { clsx } from '#lib/utils.ts'
import { Button } from '#ui/button.tsx'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#ui/collapsible.tsx'

const rootClass = clsx('sans max-w-[20em]')

const triggerClass = clsx(
	'box-border w-full border-0 bg-background p-2.5 text-center text-foreground text-xl focus:text-red-500 focus:shadow-inner focus:outline-hidden data-[state=open]:bg-red-500 data-[state="open"]:text-white data-disabled:text-gray-300 focus:data-[state=open]:text-black',
)

const contentClass = clsx('p-2.5 leading-6')

const styles = clsx(
	'border-2 border-blue-500 bg-blue-300 p-2.5 :disabled:opacity-50 data-[state=closed]:border-red-500 data-[state=open]:border-green-500 data-disabled:border-dashed',
)

const rootAttrClass = clsx(styles)
const triggerAttrClass = clsx(styles)
const contentAttrClass = clsx(
	// ensure we can see the content (because it has `hidden` attribute)
	'block',
	styles,
)

const meta = {
	component: Collapsible,
} satisfies Meta<typeof Collapsible>

export function Default(): ReactElement {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Collapsible
			className="w-[350px] space-y-2"
			onOpenChange={setIsOpen}
			open={isOpen}
		>
			<div className="flex items-center justify-between space-x-4 px-4">
				<h4 className="font-semibold text-sm">@peduarte starred 3 repositories</h4>
				<CollapsibleTrigger asChild={true}>
					<Button
						size="sm"
						variant="ghost"
					>
						<CaretSortIcon className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
				@radix-ui/primitives
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
					@radix-ui/colors
				</div>
				<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
					@stitches/react
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export function Styled(): ReactElement {
	return (
		<Collapsible className={rootClass}>
			<CollapsibleTrigger className={triggerClass}>Trigger</CollapsibleTrigger>
			<CollapsibleContent className={contentClass}>Content 1</CollapsibleContent>
		</Collapsible>
	)
}

export function Controlled(): ReactElement {
	const [open, setOpen] = useState(false)
	return (
		<Collapsible
			className={rootClass}
			onOpenChange={setOpen}
			open={open}
		>
			<CollapsibleTrigger className={triggerClass}>{open ? 'close' : 'open'}</CollapsibleTrigger>
			<CollapsibleContent
				asChild={true}
				className={contentClass}
			>
				<article>Content 1</article>
			</CollapsibleContent>
		</Collapsible>
	)
}

export function Chromatic(): ReactElement {
	return (
		<>
			<h1>Uncontrolled</h1>
			<h2>Closed</h2>
			<Collapsible className={rootClass}>
				<CollapsibleTrigger className={triggerClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h2>Open</h2>
			<Collapsible
				className={rootClass}
				defaultOpen={true}
			>
				<CollapsibleTrigger className={triggerClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h1>Controlled</h1>
			<h2>Closed</h2>
			<Collapsible
				className={rootClass}
				open={false}
			>
				<CollapsibleTrigger className={triggerClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h2>Open</h2>
			<Collapsible
				className={rootClass}
				open={true}
			>
				<CollapsibleTrigger className={triggerClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h1>Disabled</h1>
			<Collapsible
				className={rootClass}
				disabled={true}
			>
				<CollapsibleTrigger className={triggerClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h1>State attributes</h1>
			<h2>Closed</h2>
			<Collapsible className={rootAttrClass}>
				<CollapsibleTrigger className={triggerAttrClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentAttrClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h2>Open</h2>
			<Collapsible
				className={rootAttrClass}
				defaultOpen={true}
			>
				<CollapsibleTrigger className={triggerAttrClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentAttrClass}>Content 1</CollapsibleContent>
			</Collapsible>

			<h2>Disabled</h2>
			<Collapsible
				className={rootAttrClass}
				defaultOpen={true}
				disabled={true}
			>
				<CollapsibleTrigger className={triggerAttrClass}>Trigger</CollapsibleTrigger>
				<CollapsibleContent className={contentAttrClass}>Content 1</CollapsibleContent>
			</Collapsible>
		</>
	)
}
Chromatic.parameters = { chromatic: { disable: false } }

export default meta
