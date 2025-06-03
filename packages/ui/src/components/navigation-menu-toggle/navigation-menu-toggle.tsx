import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import type { ReactElement } from 'react'
import { composeRenderProps, ToggleButton, type ToggleButtonProps } from 'react-aria-components'

import { clsx, tv } from '#lib/utils.ts'

import { HamburgerIcon } from './hamburger-icon.tsx'

const styles = tv({
	base: clsx(
		'relative flex aspect-square size-6 content-center items-center justify-center rounded border-0 bg-transparent outline outline-blue-600 outline-offset-2',
	),
	variants: {
		isFocusVisible: {
			false: 'outline-0',
			true: 'outline-2',
		},
	},
})

export function NavigationMenuToggle(props: Omit<ToggleButtonProps, 'children' | 'type'>): ReactElement {
	return (
		<ToggleButton
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) => styles({ ...renderProps, className }))}
			type="button"
		>
			{({ isSelected }): ReactElement => (
				<AccessibleIcon label="Navigation menu toggle">
					<HamburgerIcon isSelected={isSelected} />
				</AccessibleIcon>
			)}
		</ToggleButton>
	)
}
