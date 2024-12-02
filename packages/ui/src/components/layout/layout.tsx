import { type ComponentProps, forwardRef } from 'react'
import { clsx } from '../../lib/utils.ts'

const bodyName = 'Body'
const Body = forwardRef<HTMLBodyElement, ComponentProps<'body'>>(
	({ className, children, ...rest }, ref) => {
		return (
			<body
				className={clsx('grid w-full auto-rows-auto grid-cols-1', className)}
				data-testid={bodyName}
				ref={ref}
				{...rest}
			>
				{children}
			</body>
		)
	},
)
Body.displayName = bodyName

const headerName = 'Header'
const Header = forwardRef<HTMLHeadElement, ComponentProps<'header'>>(
	({ className, ...rest }, ref) => (
		<header
			className={clsx('row-start-1 row-end-2', className)}
			data-testid={headerName}
			ref={ref}
			{...rest}
		/>
	),
)
Header.displayName = headerName

const mainName = 'Main'
const Main = forwardRef<HTMLElement, ComponentProps<'main'>>(({ className, ...rest }, ref) => (
	<main
		className={clsx('row-start-2 row-end-3 min-h-screen overflow-y-auto', className)}
		data-testid={mainName}
		ref={ref}
		{...rest}
	/>
))
Main.displayName = mainName

const footerName = 'Footer'
const Footer = forwardRef<HTMLElement, ComponentProps<'footer'>>(({ className, ...rest }, ref) => (
	<footer
		className={clsx('row-start-3 row-end-4', className)}
		data-testid={footerName}
		{...rest}
		ref={ref}
	/>
))
Footer.displayName = footerName

export const Layout = {
	Body,
	Header,
	Main,
	Footer,
}
