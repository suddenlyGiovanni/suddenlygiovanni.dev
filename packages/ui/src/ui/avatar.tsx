import { Fallback, Image, Root } from '@radix-ui/react-avatar'
import type { ComponentPropsWithRef, FC } from 'react'

import { clsx } from '#lib/utils.ts'

const Avatar: FC<ComponentPropsWithRef<typeof Root>> = ({ className, ref, ...props }) => (
	<Root
		className={clsx('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
		ref={ref}
		{...props}
	/>
)
Avatar.displayName = Root.displayName

const AvatarImage: FC<ComponentPropsWithRef<typeof Image>> = ({ className, ref, ...props }) => (
	<Image
		className={clsx('aspect-square h-full w-full', className)}
		ref={ref}
		{...props}
	/>
)
AvatarImage.displayName = Image.displayName

const AvatarFallback: FC<ComponentPropsWithRef<typeof Fallback>> = ({
	className,
	ref,
	...props
}) => (
	<Fallback
		className={clsx(
			'flex h-full w-full items-center justify-center rounded-full bg-muted',
			className,
		)}
		ref={ref}
		{...props}
	/>
)
AvatarFallback.displayName = Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
