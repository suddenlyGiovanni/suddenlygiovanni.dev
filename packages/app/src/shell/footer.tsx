import { Layout } from '@repo/ui/components/layout/layout.tsx'
import { GitHubIconLink, LinkedInIconLink, TwitterIconLink } from '@repo/ui/components/social/social.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import type { JSX } from 'react'

import { config } from '#root/src/config.ts'

const copyrightYear = new Date().getFullYear().toString()

export function Footer(): JSX.Element {
	return (
		<Layout.Footer
			className={clsx(
				'sticky bottom-0 z-auto w-full border-border/40 border-t bg-background/95 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/60',
			)}
		>
			<div
				className={clsx(
					'container relative mx-auto flex h-12 max-w-4xl flex-row flex-nowrap items-center justify-between',
				)}
			>
				<span className="mb-0 flex-auto">© {copyrightYear} Giovanni Ravalico</span>
				<address className="flex items-center justify-between gap-4 md:min-w-32">
					<TwitterIconLink href={config.socials.Twitter.url} />
					<GitHubIconLink href={config.socials.GitHub.url} />
					<LinkedInIconLink href={config.socials.LinkedIn.url} />
				</address>
			</div>
		</Layout.Footer>
	)
}
