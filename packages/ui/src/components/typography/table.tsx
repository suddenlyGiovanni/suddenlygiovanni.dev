import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

export const Tr: FC<ComponentPropsWithRef<'tr'>> = ({ className, children, ref, ...props }) => (
	<tr
		className={clsx('m-0 border-t p-0 even:bg-muted', className)}
		ref={ref}
		{...props}
	>
		{children}
	</tr>
)
Tr.displayName = 'Tr'

export const Th: FC<ComponentPropsWithRef<'th'>> = ({ className, children, ref, ...props }) => (
	<th
		className={clsx(
			'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
	</th>
)
Th.displayName = 'Th'

export const Td: FC<ComponentPropsWithRef<'td'>> = ({ className, children, ref, ...props }) => (
	<td
		className={clsx(
			'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
	</td>
)
Td.displayName = 'Td'
