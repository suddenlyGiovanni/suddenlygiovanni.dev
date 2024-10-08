import { Fallback, Image, Root } from '@radix-ui/react-avatar'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { clsx } from '../lib/utils.ts'

const Avatar = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
	({ className, ...props }, ref) => (
		<Root
			className={clsx('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
			ref={ref}
			{...props}
		/>
	),
)
Avatar.displayName = Root.displayName

const AvatarImage = forwardRef<ElementRef<typeof Image>, ComponentPropsWithoutRef<typeof Image>>(
	({ className, ...props }, ref) => (
		<Image
			className={clsx('aspect-square h-full w-full', className)}
			ref={ref}
			{...props}
		/>
	),
)
AvatarImage.displayName = Image.displayName

const AvatarFallback = forwardRef<
	ElementRef<typeof Fallback>,
	ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
	<Fallback
		className={clsx(
			'flex h-full w-full items-center justify-center rounded-full bg-muted',
			className,
		)}
		ref={ref}
		{...props}
	/>
))
AvatarFallback.displayName = Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
