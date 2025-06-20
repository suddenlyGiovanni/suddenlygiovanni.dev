import { Layout } from '@repo/ui/components/layout/layout.tsx'
import { NavigationMenuToggle } from '@repo/ui/components/navigation-menu-toggle/navigation-menu-toggle.tsx'
import { SuddenlyGiovanni } from '@repo/ui/components/suddenly-giovanni/suddenly-giovanni.tsx'
import { useToggle } from '@repo/ui/hooks/use-toggle.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import type { ReactElement, SyntheticEvent } from 'react'

import avatarAssetUrl from '#root/content/assets/giovanni_ravalico-profile_bw.webp'
import { ThemeSwitch } from '#root/src/routes/resources/theme-switch.tsx'
import { routesRecord } from '#root/src/routes-record.ts'

import { NavLink } from './nav-link.tsx'

const routes = (
	[
		routesRecord['about-me'],
		routesRecord['second-brain'],
		routesRecord['reading-journal'],
		routesRecord.resume,
		routesRecord.motivations,
	] as const
).filter(({ hidden }) => !hidden)

const PRIMARY_NAVIGATION = 'primary-navigation'

export function Header({ theme }: { theme: 'light' | 'dark' | null }): ReactElement {
	const [isMobileNavigationVisible, toggleMobileNavigationVisibility] = useToggle(false)

	function handleMobileNavigationClick<T extends HTMLElement>(event: SyntheticEvent<T>): void {
		event.stopPropagation()
		toggleMobileNavigationVisibility()
	}

	return (
		<Layout.Header
			className={clsx([
				'sticky top-0 z-10 w-full overflow-x-clip border-border/40 border-b bg-background/95 py-2 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/60',
			])}
		>
			<div className={clsx(['container relative flex max-w-4xl flex-row items-center justify-between'])}>
				<SuddenlyGiovanni
					ariaLabel={routesRecord['about-me'].description}
					hrefUrl={avatarAssetUrl}
					to={routesRecord['about-me'].url}
				/>

				<NavigationMenuToggle
					aria-controls={PRIMARY_NAVIGATION}
					aria-expanded={isMobileNavigationVisible}
					className={clsx('absolute top-3 right-8 z-50 block md:hidden')}
					isSelected={isMobileNavigationVisible}
					onPress={toggleMobileNavigationVisibility}
				/>

				<nav aria-label="mobile navigation">
					<menu
						className={clsx(
							// Base styles
							'fixed flex px-8 py-12',
							// Mobile navigation
							'inset-0 z-40 h-screen transform-gpu flex-col items-end justify-start gap-12 border-border/40 bg-background/95 backdrop-blur-sm transition-transform delay-150 duration-300 ease-in-out supports-backdrop-filter:bg-background/60',
							// Desktop navigation
							'md:static md:z-auto md:h-full md:translate-x-0 md:flex-row md:items-center md:justify-between md:gap-2 md:bg-inherit md:bg-transparent md:p-0 md:backdrop-filter-none md:transition-none',
							// Mobile navigation
							isMobileNavigationVisible ? 'translate-x-0' : 'translate-x-full',
						)}
						id={PRIMARY_NAVIGATION}
						onClick={handleMobileNavigationClick}
						onKeyDown={handleMobileNavigationClick}
					>
						{routes.map(({ title, url, uri, description, disabled }) => (
							<li
								className={clsx(
									'flex min-h-16 min-w-32 items-center justify-end outline-hidden md:min-h-fit md:min-w-fit',
								)}
								key={uri}
							>
								<NavLink
									aria-disabled={disabled ? 'true' : undefined}
									aria-label={description}
									onClick={handleMobileNavigationClick}
									prefetch="intent"
									role="menuitem"
									tabIndex={0}
									to={url}
								>
									{title}
								</NavLink>
							</li>
						))}
						<ThemeSwitch
							className="ml-16 aspect-square"
							userPreference={theme}
						/>
					</menu>
				</nav>
			</div>
		</Layout.Header>
	)
}
