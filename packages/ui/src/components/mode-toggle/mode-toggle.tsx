import type { ReactNode } from 'react'
import { cn } from '../../lib/utils.ts'
import { Button } from '../../ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Icons } from '../icons/icons.tsx'

interface ModeToggleProps {
	readonly setTheme: (theme: 'dark' | 'light') => void
	readonly theme: 'dark' | 'light' | null
	readonly className?: string
}

export function ModeToggle({ setTheme, theme, className }: ModeToggleProps): ReactNode {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className={cn(className)} size="icon" variant="ghost">
					{theme === `light` || theme === null ? (
						<Icons.moon className={cn('h-[1.2rem]', 'w-[1.2rem]')} />
					) : (
						<Icons.sun className={cn('h-[1.2rem]', 'w-[1.2rem]')} />
					)}

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
