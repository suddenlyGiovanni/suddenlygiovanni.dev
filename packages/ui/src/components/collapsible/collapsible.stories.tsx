import * as React from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import type { ReactElement } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible'
import { Button } from '../../ui/button'

const meta = {
	title: 'Components/Collapsible',
	component: Collapsible,
	subcomponents: { CollapsibleContent, CollapsibleTrigger },
} satisfies Meta

export function Default(): ReactElement {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<Collapsible
			className="w-[350px] space-y-2"
			onOpenChange={setIsOpen}
			open={isOpen}
		>
			<div className="flex items-center justify-between space-x-4 px-4">
				<h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
				<CollapsibleTrigger asChild>
					<Button
						size="sm"
						variant="ghost"
					>
						<CaretSortIcon className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className="font-mono rounded-md border px-4 py-2 text-sm shadow-sm">
				@radix-ui/primitives
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="font-mono rounded-md border px-4 py-2 text-sm shadow-sm">
					@radix-ui/colors
				</div>
				<div className="font-mono rounded-md border px-4 py-2 text-sm shadow-sm">
					@stitches/react
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export default meta
