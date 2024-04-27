import type { JSX } from 'react'

import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'
import {
	GitHubIconLink,
	LinkedInIconLink,
	TwitterIconLink,
} from '@suddenlygiovanni/ui/components/social/social.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import { config } from '~/config.ts'

const copyrightYear = new Date().getFullYear().toString()

export function Footer(): JSX.Element {
	return (
		<Layout.Footer
			className={clsx([
				'sticky',
				'bottom-0',
				'w-full',
				'z-auto',
				'border-t',
				'border-border/40',
				'bg-background/95',
				'backdrop-blur',
				'shadow',
				'supports-[backdrop-filter]:bg-background/60',
			])}
		>
			<div
				className={clsx([
					'container',
					'relative',
					'mx-auto',
					'flex',
					'h-12',
					'max-w-4xl',
					'flex-row',
					'flex-nowrap',
					'items-center',
					'justify-between',
				])}
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
