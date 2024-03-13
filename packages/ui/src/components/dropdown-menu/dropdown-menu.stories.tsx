import type { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import type { Meta, StoryFn } from '@storybook/react'
import { useCallback, useState } from 'react'
import { Button } from '~/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '~/ui/dropdown-menu'

const meta: Meta = {
	component: DropdownMenu,
}

export default meta

type Checked = NonNullable<DropdownMenuCheckboxItemProps['checked']>

export const Checkboxes: StoryFn = () => {
	const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
	const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
	const [showPanel, setShowPanel] = useState<Checked>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Appearance</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
					Status Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={showActivityBar}
					disabled
					onCheckedChange={setShowActivityBar}
				>
					Activity Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
					Panel
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

enum Position {
	Top = 'top',
	Bottom = 'bottom',
	Right = 'right',
}
export const RadioGroup: StoryFn = () => {
	const [position, setPosition] = useState(Position.Bottom)

	const onValueChange = useCallback((value: string): void => {
		function isPosition(_value: string): _value is Position {
			return Object.values(Position).includes(_value as Position)
		}

		if (isPosition(value)) {
			setPosition(value)
		}
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup onValueChange={onValueChange} value={position}>
					<DropdownMenuRadioItem value={Position.Top}>Top</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value={Position.Bottom}>Bottom</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value={Position.Right}>Right</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const KitchenSink: StoryFn = () => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline">Open</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-56">
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					Profile
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Billing
					<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Settings
					<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Keyboard shortcuts
					<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Email</DropdownMenuItem>
							<DropdownMenuItem>Message</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>More...</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuItem>
					New Team
					<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem>GitHub</DropdownMenuItem>
			<DropdownMenuItem>Support</DropdownMenuItem>
			<DropdownMenuItem disabled>API</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				Log out
				<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)
