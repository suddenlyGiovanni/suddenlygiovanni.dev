import { GitHubIconLink, Layout, LinkedInIconLink, TwitterIconLink } from '@suddenly-giovanni/ui'
import type { JSX } from 'react'

const twitter = { url: '', handle: '', user: '' },
	linkedin = { url: '', handle: '', user: '' },
	github = { url: '', handle: '', user: '' }

export function Footer(): JSX.Element {
	const copyrightYear = new Date().getFullYear().toString()
	return (
		<Layout.Footer className="w-full  border-t border-t-black">
			<div className="flex max-w-screen-md flex-wrap content-between pb-4 sm:pb-4">
				<span className="mb-0 mt-4 flex-auto">© {copyrightYear} Giovanni Ravalico</span>
				<address className="mt-4 flex min-w-32 items-center justify-between">
					<TwitterIconLink href={twitter.url + twitter.handle} />
					<GitHubIconLink href={github.url + github.user} />
					<LinkedInIconLink href={linkedin.url + linkedin.user} />
				</address>
			</div>
		</Layout.Footer>
	)
}
