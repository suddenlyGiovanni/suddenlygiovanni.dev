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
		<Layout.Footer className="w-full border-t border-t-black">
			<div
				className={cn(
					['flex', 'flex-wrap', 'content-between', 'flex-nowrap'],
					['mx-auto', 'max-w-4xl', 'px-8', 'pb-4', 'sm:pb-4'],
				)}
			>
				<span className="mb-0 mt-4 flex-auto">© {copyrightYear} Giovanni Ravalico</span>
				<address className="mt-4 flex items-center justify-between gap-4 md:min-w-32">
					<TwitterIconLink href={twitter.url + twitter.handle} />
					<GitHubIconLink href={github.url + github.user} />
					<LinkedInIconLink href={linkedin.url + linkedin.user} />
				</address>
			</div>
		</Layout.Footer>
	)
}
