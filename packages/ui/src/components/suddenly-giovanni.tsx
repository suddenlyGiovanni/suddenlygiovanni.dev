import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import type { JSX } from 'react'
import { cn } from '../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { T } from '.'

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
			<T.h1
				className={cn(
					'my-auto',
					'ml-4',
					'select-none',
					'text-base',
					'lg:text-base',
					'font-medium',
					'text-foreground',
				)}
			>
				suddenlyGiovanni
			</T.h1>
		</Link>
	)
}
