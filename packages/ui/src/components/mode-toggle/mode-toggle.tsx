import type { FC, MouseEventHandler } from 'react'

import { Icons } from '#components/icons/icons.tsx'
import { clsx } from '#lib/utils.ts'
import { Button } from '#ui/button.tsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#ui/dropdown-menu.tsx'

export type Theme = 'dark' | 'light'

interface ModeToggleProps {
	readonly setTheme: (theme: Theme) => void
	readonly theme: Theme | null
	readonly className?: string
}

const NAME = 'ModeToggle'
const ModeToggle: FC<ModeToggleProps> = ({ setTheme, theme, className }) => {
	const isLight = theme === 'light'
	const isDark = theme === 'dark'

	function makeToggleHandler(mode: Theme): MouseEventHandler<HTMLDivElement> {
		return function toggleHandler(_) {
			setTheme(mode)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild={true}>
				<Button
					className={clsx(className)}
					data-testid={NAME}
					size="icon"
					variant="ghost"
				>
					{isLight || theme === null ? (
						<Icons.moon className={clsx('h-[1.2rem] w-[1.2rem]')} />
					) : (
						<Icons.sun className={clsx('h-[1.2rem] w-[1.2rem]')} />
					)}

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					disabled={isLight}
					onClick={makeToggleHandler('light')}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isDark}
					onClick={makeToggleHandler('dark')}
				>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
ModeToggle.displayName = NAME

export { ModeToggle }
