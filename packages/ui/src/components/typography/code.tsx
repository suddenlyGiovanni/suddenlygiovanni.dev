import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Code: FC<ComponentPropsWithRef<'code'>> = ({ className, children, ref, ...props }) => (
	<code
		className={clsx(
			'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
	</code>
)
Code.displayName = 'Code'
