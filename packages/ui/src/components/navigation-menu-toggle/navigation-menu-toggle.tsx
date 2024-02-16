import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { forwardRef, memo } from 'react'
import { composeRenderProps, ToggleButton, type ToggleButtonProps } from 'react-aria-components'
import { cn, tv } from '../../lib/utils.ts'
import { HamburgerIcon } from './hamburger-icon.tsx'

const styles = tv({
	base: cn(
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

export const NavigationMenuToggle = memo(
	forwardRef<HTMLButtonElement, Omit<ToggleButtonProps, 'children' | 'type'>>((props, ref) => (
		<ToggleButton
			ref={ref}
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
	)),
)
NavigationMenuToggle.displayName = 'NavigationMenuToggle'
