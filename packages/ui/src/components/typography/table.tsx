import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from '../../lib/utils.ts'

export const Tr = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
	({ className, children, ...props }, ref) => (
		<tr
			className={clsx('m-0', 'border-t', 'p-0', 'even:bg-muted', className)}
			ref={ref}
			{...props}
		>
			{children}
		</tr>
	),
)
Tr.displayName = 'Tr'

export const Th = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
	({ className, children, ...props }, ref) => (
		<th
			className={clsx(
				'border',
				'px-4',
				'py-2',
				'text-left',
				'font-bold',
				'[&[align=center]]:text-center',
				'[&[align=right]]:text-right',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</th>
	),
)
Th.displayName = 'Th'

export const Td = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
	({ className, children, ...props }, ref) => (
		<td
			className={clsx(
				'border',
				'px-4',
				'py-2',
				'text-left',
				'[&[align=center]]:text-center',
				'[&[align=right]]:text-right',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</td>
	),
)
Td.displayName = 'Td'
