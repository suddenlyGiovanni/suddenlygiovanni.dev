import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import type { JSX } from 'react'
import { cn } from '../../lib/utils'
import { SocialIcon } from './social-icon'

function SocialLink({ className, children, ...props }: JSX.IntrinsicElements['a']): JSX.Element {
	return (
		<a
			{...props}
			className={cn(
				'flex cursor-pointer content-center items-center text-black hover:text-black/70',
				className,
			)}
		>
			{children}
		</a>
	)
}

type Props = Omit<JSX.IntrinsicElements['a'], 'children'>

export function TwitterIconLink({ href, className, ...props }: Props): JSX.Element {
	return (
		<SocialLink
			aria-label="Visit my Twitter"
			className={className}
			href={href}
			target="_blank"
			{...props}
		>
			<AccessibleIcon label="Twitter">
				<SocialIcon
					aria-label="Twitter icon"
					network="twitter"
					// size={24}
				/>
			</AccessibleIcon>
		</SocialLink>
	)
}

export function LinkedInIconLink({ href, className, ...props }: Props): JSX.Element {
	return (
		<SocialLink
			aria-label="Visit my LinkedIn"
			className={className}
			href={href}
			target="_blank"
			{...props}
		>
			<AccessibleIcon label="LinkedIn">
				<SocialIcon
					aria-label="LinkedIn icon"
					network="linkedin"
					// size={24}
				/>
			</AccessibleIcon>
		</SocialLink>
	)
}

export function GitHubIconLink({ className, href, ...props }: Props): JSX.Element {
	return (
		<SocialLink
			aria-label="Visit my GitHub"
			className={className}
			href={href}
			target="_blank"
			{...props}
		>
			<AccessibleIcon label="GitHub">
				<SocialIcon
					aria-label="GitHub icon"
					network="github"
					// size={24}
				/>
			</AccessibleIcon>
		</SocialLink>
	)
}