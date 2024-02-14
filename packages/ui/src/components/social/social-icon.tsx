import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import type { IconProps } from '@radix-ui/react-icons/dist/types'
import { forwardRef } from 'react'

export const IconMap = new Map([
	['twitter', TwitterLogoIcon],
	['github', GitHubLogoIcon],
	['linkedin', LinkedInLogoIcon],
] as const)
export type SocialNetworks = Parameters<(typeof IconMap)['get']>[0]

interface SocialIconProps extends IconProps {
	network: SocialNetworks
}

const name = 'SocialIcon'
export const SocialIcon = forwardRef<SVGSVGElement, SocialIconProps>(
	({ network, ...props }: SocialIconProps, ref) => {
		if (IconMap.has(network)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we are already checking if the key exists
			const Icon = IconMap.get(network)!
			const dataTestId = `${name}-${network}`
			return (
				<Icon
					data-testid={dataTestId}
					ref={ref}
					{...props}
				/>
			)
		}
		throw new Error("couldn't find the social icon associated to the required network key")
	},
)
SocialIcon.displayName = name
