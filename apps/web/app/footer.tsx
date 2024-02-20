import {
	GitHubIconLink,
	Layout,
	LinkedInIconLink,
	TwitterIconLink,
	cn,
} from '@suddenly-giovanni/ui'
import type { JSX } from 'react'

export const twitter = { url: '', handle: '', user: '' },
	linkedin = { url: '', handle: '', user: '' },
	github = { url: '', handle: '', user: '' }

const copyrightYear = new Date().getFullYear().toString()

export function Footer(): JSX.Element {
	return (
		<Layout.Footer
			className={cn([
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
				className={cn([
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
					<TwitterIconLink href={twitter.url + twitter.handle} />
					<GitHubIconLink href={github.url + github.user} />
					<LinkedInIconLink href={linkedin.url + linkedin.user} />
				</address>
			</div>
		</Layout.Footer>
	)
}
