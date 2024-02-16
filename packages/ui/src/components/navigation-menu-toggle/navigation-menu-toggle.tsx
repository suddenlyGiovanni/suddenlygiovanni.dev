import {type ReactElement} from 'react'
import {
	ToggleButton as RACToggleButton,
	composeRenderProps,
	type ToggleButtonProps,
} from 'react-aria-components'
import {HamburgerMenuIcon, Cross1Icon} from '@radix-ui/react-icons'
import {AccessibleIcon} from '@radix-ui/react-accessible-icon'
import {cn, tv} from '../../lib/utils.ts'

const focusRing = tv({
	base: 'outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2',
	variants: {
		isFocusVisible: {
			false: 'outline-0',
			true: 'outline-2',
		},
	},
})

const styles = tv({
	extend: focusRing,
	base: 'px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 forced-colors:border-[ButtonBorder] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default forced-color-adjust-none',
	variants: {
		isSelected: {
			false: 'bg-gray-100 hover:bg-gray-200 pressed:bg-gray-300 text-gray-800 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 dark:text-zinc-100 forced-colors:!bg-[ButtonFace] forced-colors:!text-[ButtonText]',
			true: 'bg-gray-700 hover:bg-gray-800 pressed:bg-gray-900 text-white dark:bg-slate-300 dark:hover:bg-slate-200 dark:pressed:bg-slate-100 dark:text-black forced-colors:!bg-[Highlight] forced-colors:!text-[HighlightText]',
		},
		isDisabled: {
			true: 'bg-gray-100 dark:bg-zinc-800 forced-colors:!bg-[ButtonFace] text-gray-300 dark:text-zinc-600 forced-colors:!text-[GrayText] border-black/5 dark:border-white/5 forced-colors:border-[GrayText]',
		},
	},
})
// const x = composeRenderProps(props.className, (className, renderProps) =>
// 	styles({ ...renderProps, className }),
// )

type Props = Omit<ToggleButtonProps, 'children'>

export function NavigationMenuToggle(props: Props): ReactElement {
	return (
		<RACToggleButton
			{...props}
			className={({isSelected}) =>
				cn('aspect-square size-6 border-0 bg-transparent', isSelected, props.className)
			}
		>
			{({isSelected}) => (
				<AccessibleIcon label="Navigation menu toggle">
					{!isSelected ?
						<HamburgerMenuIcon />
						: <Cross1Icon />}
				</AccessibleIcon>
			)}
		</RACToggleButton>
	)
}
