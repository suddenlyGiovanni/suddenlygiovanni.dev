import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import type { ReactElement } from 'react'
import { ToggleButton, type ToggleButtonProps, composeRenderProps } from 'react-aria-components'

import { clsx, tv } from '../../lib/utils.ts'
import { HamburgerIcon } from './hamburger-icon.tsx'

const styles = tv({
	base: clsx(
		'relative',
		'size-6',
		'aspect-square',
		'border-0',
		'rounded',
		'bg-transparent',
		'flex',
		'items-center',
		'content-center',
		'justify-center',
		'outline',
		'outline-offset-2',
		'outline-blue-600',
	),
	variants: {
		isFocusVisible: {
			false: 'outline-0',
			true: 'outline-2',
		},
	},
})

export function NavigationMenuToggle(
	props: Omit<ToggleButtonProps, 'children' | 'type'>,
): ReactElement {
	return (
		<ToggleButton
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				styles({ ...renderProps, className }),
			)}
			type="button"
		>
			{({ isSelected }) => (
				<AccessibleIcon label="Navigation menu toggle">
					<HamburgerIcon isSelected={isSelected} />
				</AccessibleIcon>
			)}
		</ToggleButton>
	)
}
