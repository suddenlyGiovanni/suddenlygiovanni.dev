import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import type { JSX } from 'react'
import { Skeleton } from '../../ui/skeleton'
import { cn } from '../../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

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
				<AvatarFallback>
					<Skeleton className="h-full w-full rounded-xl" />
				</AvatarFallback>
			</Avatar>
			<h1
				className={cn(
					'my-auto',
					'ml-4',
					'select-none',
					'text-base',
					'lg:text-base',
					'text-foreground',
					'font-comic-hero',
				)}
			>
				suddenlyGiovanni
			</h1>
		</Link>
	)
}
