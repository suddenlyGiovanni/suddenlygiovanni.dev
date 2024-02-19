import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import type { ReactNode } from 'react'
import { Button } from '../../ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from '../../lib/utils.ts'

interface ModeToggleProps {
	readonly setTheme: (theme: 'dark' | 'light') => void
	readonly theme: 'dark' | 'light' | null
	readonly className?: string
}

export function ModeToggle({ setTheme, theme, className }: ModeToggleProps): ReactNode {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className={cn(className)}
					size="icon"
					variant="ghost"
				>
					<MoonIcon
						className={cn(
							'h-[1.2rem]',
							'w-[1.2rem]',
							'rotate-0',
							'scale-100',
							'transition-all',
							'dark:-rotate-90',
							'dark:scale-0',
						)}
					/>

					<SunIcon
						className={cn(
							'absolute',
							'h-[1.2rem]',
							'w-[1.2rem]',
							'rotate-90',
							'scale-0',
							'transition-all',
							'dark:rotate-0',
							'dark:scale-100',
						)}
					/>

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					disabled={theme === `light`}
					onClick={() => {
						setTheme(`light`)
					}}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={theme === `dark`}
					onClick={() => {
						setTheme(`dark`)
					}}
				>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
