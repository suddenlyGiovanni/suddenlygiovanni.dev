import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export function Button({ children, ...other }: ButtonProps): JSX.Element {
	return (
		<button type="button" {...other}>
			{children}
		</button>
	)
}

Button.displayName = 'Button'
