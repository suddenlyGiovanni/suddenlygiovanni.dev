import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import type { JSX } from 'react'
import { cn } from '../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

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
			<Avatar>
				<AvatarImage
					alt="Giovanni Ravalico"
					src={hrefUrl}
				/>
				<AvatarFallback>SG</AvatarFallback>
			</Avatar>
			<h1 className="mb-auto ml-4 mt-auto select-none border-none pb-0 text-base font-medium tracking-wide">
				suddenlyGiovanni
			</h1>
		</Link>
	)
}
