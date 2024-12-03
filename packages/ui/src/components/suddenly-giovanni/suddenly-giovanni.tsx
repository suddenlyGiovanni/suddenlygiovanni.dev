import type { JSX } from 'react'
import { Link, type LinkProps } from 'react-router'

import { clsx } from '../../lib/utils.ts'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar.tsx'
import { Skeleton } from '../../ui/skeleton.tsx'

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
			className={clsx(
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
					<Skeleton
						className="h-full w-full rounded-xl"
						asChild={true}
					>
						<span />
					</Skeleton>
				</AvatarFallback>
			</Avatar>
			<h1
				className={clsx(
					'my-auto',
					'ml-4',
					'select-none',
					'text-base',
					'lg:text-base',
					'text-foreground',
					'font-comic',
					'font-comic-hero',
				)}
			>
				suddenlyGiovanni
			</h1>
		</Link>
	)
}
