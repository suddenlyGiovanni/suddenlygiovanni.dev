import { type ReactElement } from 'react'
import {
	ToggleButton as RACToggleButton,
	composeRenderProps,
	type ToggleButtonProps,
} from 'react-aria-components'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { tv } from '../../lib/utils.ts'

const focusRing = tv({
	base: 'outline outline-offset-2 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]',
	variants: {
		isFocusVisible: {
			false: 'outline-0',
			true: 'outline-2',
		},
	},
})

const styles = tv({
	extend: focusRing,
	base: [
		'aspect-square',
		'size-6',
		'border-0',
		'bg-transparent',
		'content-center',
		'flex',
		'justify-center',
		'items-center',
	],
	variants: {
		isSelected: {
			false: [
				'bg-gray-100',
				'hover:bg-gray-200',
				'pressed:bg-gray-300',
				'text-gray-800',
				'dark:bg-zinc-600',
				'dark:hover:bg-zinc-500',
				'dark:pressed:bg-zinc-400',
				'dark:text-zinc-100',
				'forced-colors:!bg-[ButtonFace]',
				'forced-colors:!text-[ButtonText]',
			],
			true: 'pressed:bg-gray-900 dark:pressed:bg-slate-100 bg-gray-700 text-white hover:bg-gray-800 dark:bg-slate-300 dark:text-black dark:hover:bg-slate-200 forced-colors:!bg-[Highlight] forced-colors:!text-[HighlightText]',
		},
	},
})

type Props = Omit<ToggleButtonProps, 'children' | 'type'>

export function NavigationMenuToggle(props: Props): ReactElement {
	return (
		<RACToggleButton
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				styles({ ...renderProps, className }),
			)}
			type="button"
		>
			{({ isSelected }) => (
				<AccessibleIcon label="Navigation menu toggle">
					{!isSelected ?
						<HamburgerMenuIcon />
					:	<Cross1Icon />}
				</AccessibleIcon>
			)}
		</RACToggleButton>
	)
}
