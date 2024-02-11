import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react'
import { cn } from '../lib/utils'

const name = 'Button'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps): JSX.Element {
	return (
		<button
			className={cn('p-1 text-2xl text-blue-600', className)}
			dates-testid={name}
			type="button"
			{...rest}
		>
			{children}
		</button>
	)
}

Button.displayName = name
