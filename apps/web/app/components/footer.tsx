import { Twitter, LinkedIn, GitHub } from '@suddenly-giovanni/ui'
import type { JSX } from 'react'

const twitter = { url: '', handle: '', user: '' },
	linkedin = { url: '', handle: '', user: '' },
	github = { url: '', handle: '', user: '' }

export function Footer(): JSX.Element {
	const copyrightYear = new Date().getFullYear().toString()
	return (
		<footer className="relative bottom-0 w-full shrink-0 border-t border-t-black">
			<div className="flex max-w-screen-md flex-wrap content-between pb-4 sm:pb-4">
				<p className="mb-0 mt-4 flex-auto">© {copyrightYear} Giovanni Ravalico</p>
				<address className="mt-4 flex min-w-32 items-center justify-between">
					<Twitter href={twitter.url + twitter.handle} />
					<GitHub href={github.url + github.user} />
					<LinkedIn href={linkedin.url + linkedin.user} />
				</address>
			</div>
		</footer>
	)
}
