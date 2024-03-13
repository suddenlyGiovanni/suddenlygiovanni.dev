/* eslint-disable
	react/jsx-pascal-case -- Reason need to modify the Icons component,
	react/jsx-boolean-value  -- Reason biome is conflicting with this rule,
	*/
import { type ReactNode, memo, useMemo } from 'react'
import { Theme } from 'remix-themes'
import { Icons } from '~/components/icons/icons.tsx'
import { clsx } from '~/lib/utils.ts'
import { Button } from '~/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/ui/dropdown-menu.tsx'

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
			<DropdownMenuTrigger asChild={true}>
				<Button className={clsx(className)} size="icon" variant="ghost" data-testid={NAME}>
					{isLight || theme === null ? (
						<Icons.moon className={clsx('h-[1.2rem]', 'w-[1.2rem]')} />
					) : (
						<Icons.sun className={clsx('h-[1.2rem]', 'w-[1.2rem]')} />
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
