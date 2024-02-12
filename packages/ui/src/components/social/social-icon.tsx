import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import type { IconProps } from '@radix-ui/react-icons/dist/types'
import { forwardRef } from 'react'

export const IconMap = new Map([
	['twitter', TwitterLogoIcon],
	['github', GitHubLogoIcon],
	['linkedin', LinkedInLogoIcon],
] as const)
export type SocialNetworks = Parameters<(typeof IconMap)['get']>[0]

interface Props extends IconProps {
	network: SocialNetworks
}

export const SocialIcon = forwardRef<SVGSVGElement, Props>(({ network, ...props }: Props, ref) => {
	if (IconMap.has(network)) {
		const Icon = IconMap.get(network)!
		return (
			<Icon
				{...props}
				ref={ref}
			/>
		)
	}
	throw new Error("couldn't find the social icon associated to the required network key")
})
