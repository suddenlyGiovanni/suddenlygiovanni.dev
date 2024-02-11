import { type JSX, forwardRef } from 'react'
import { cn } from '../lib/cn'

const bodyName = 'Body'
const Body = forwardRef<HTMLBodyElement, JSX.IntrinsicElements['body']>(
	({ className, ...rest }, ref) => (
		<body
			className={cn('mx-auto h-full', className)}
			data-testid={bodyName}
			ref={ref}
			{...rest}
		/>
	),
)
Body.displayName = bodyName

const headerName = 'Header'
const Header = forwardRef<HTMLHeadElement, JSX.IntrinsicElements['header']>(
	({ className, ...rest }, ref) => (
		<header
			className={cn('sticky top-0 z-50', className)}
			data-testid={headerName}
			ref={ref}
			{...rest}
		/>
	),
)
Header.displayName = headerName

const mainName = 'Main'
const Main = forwardRef<HTMLElement, JSX.IntrinsicElements['main']>(
	({ className, ...rest }, ref) => (
		<main
			className={cn('row-start-2 row-end-3 overflow-auto', className)}
			data-testid={mainName}
			ref={ref}
			{...rest}
		/>
	),
)
Main.displayName = mainName

const footerName = 'Footer'
const Footer = forwardRef<HTMLElement, JSX.IntrinsicElements['footer']>(
	({ className, ...rest }, ref) => (
		<footer
			className={cn('row-start-3 row-end-4', className)}
			data-testid={footerName}
			{...rest}
			ref={ref}
		/>
	),
)
Footer.displayName = footerName

export const Layout = {
	Body,
	Header,
	Main,
	Footer,
}
