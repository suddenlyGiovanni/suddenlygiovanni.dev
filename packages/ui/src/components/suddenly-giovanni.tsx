import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import type { JSX } from 'react'
import { cn } from '../lib/utils'

export function SuddenlyGiovanni({
	className,
	ariaLabel = 'LinkToBlog.description',
	to = '/blog',
	hrefUrl,
}: {
	readonly ariaLabel: string
	readonly className?: string
	readonly to: LinkProps['to']
	hrefUrl: string
}): JSX.Element {
	return (
		<Link
			aria-label={ariaLabel}
			className={cn(
				'relative flex flex-row items-center no-underline hover:no-underline',
				className,
			)}
			to={to}
		>
			<img
				alt="Giovanni Ravalico's profile picture"
				height={50}
				// layout="fixed"
				loading="eager"
				// placeholder="tracedSVG"
				src={hrefUrl}
				style={{
					overflow: 'hidden',
					borderRadius: '100%',
				}}
				width={50}
			/>
			<h1 className="text mb-auto ml-4 mt-auto border-none pb-0 text-xl">suddenlyGiovanni</h1>
		</Link>
	)
}
