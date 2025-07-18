import * as SwitchPrimitives from '@radix-ui/react-switch'
import type { CustomComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

const Switch: FC<CustomComponentPropsWithRef<typeof SwitchPrimitives.Root>> = ({ className, ref, ...props }) => (
	<SwitchPrimitives.Root
		className={clsx(
			'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={clsx(
				'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
			)}
		/>
	</SwitchPrimitives.Root>
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
