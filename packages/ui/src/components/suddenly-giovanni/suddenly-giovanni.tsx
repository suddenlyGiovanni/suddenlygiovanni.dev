import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

import { clsx } from '#lib/utils.ts'
import { Avatar, AvatarFallback, AvatarImage } from '#ui/avatar.tsx'
import { Skeleton } from '#ui/skeleton.tsx'

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
}): ReactNode {
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
						asChild={true}
						className="h-full w-full rounded-xl"
					>
						<span />
					</Skeleton>
				</AvatarFallback>
			</Avatar>
			<h1
				className={clsx(
					'my-auto ml-4 select-none font-comic font-comic-hero text-base text-foreground lg:text-base',
				)}
			>
				suddenlyGiovanni
			</h1>
		</Link>
	)
}
