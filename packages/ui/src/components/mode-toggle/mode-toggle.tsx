import { memo, type ReactNode, useMemo } from 'react'
import { Theme } from 'remix-themes'
import { Icons } from '~/components/icons/icons.tsx'
import { cn } from '~/lib/utils.ts'
import { Button } from '~/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/ui/dropdown-menu'

interface ModeToggleProps {
	readonly setTheme: (theme: Theme) => void
	readonly theme: Theme | null
	readonly className?: string
}

const NAME = 'ModeToggle'
const ModeToggle = memo(function ModeToggle({
	setTheme,
	theme,
	className,
}: ModeToggleProps): ReactNode {
	const isLight = useMemo<boolean>(() => theme === Theme.LIGHT, [theme])
	const isDark = useMemo<boolean>(() => theme === Theme.DARK, [theme])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className={cn(className)} size="icon" variant="ghost" data-testid={NAME}>
					{isLight || theme === null ? (
						<Icons.moon className={cn('h-[1.2rem]', 'w-[1.2rem]')} />
					) : (
						<Icons.sun className={cn('h-[1.2rem]', 'w-[1.2rem]')} />
					)}

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					disabled={isLight}
					onClick={() => {
						setTheme(Theme.LIGHT)
					}}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isDark}
					onClick={() => {
						setTheme(Theme.DARK)
					}}
				>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
})
ModeToggle.displayName = NAME

export { ModeToggle, Theme }
