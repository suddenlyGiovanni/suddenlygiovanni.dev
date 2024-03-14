/* eslint-disable @typescript-eslint/no-non-null-assertion -- Reason map api force to re-check  */
import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { Icons } from '@/components/icons/icons.tsx'

export const IconMap = new Map([
	['twitter', Icons.twitter],
	['github', Icons.gitHub],
	['linkedin', Icons.linkedin],
] as const)
export type SocialNetworks = Parameters<(typeof IconMap)['get']>[0]

interface SocialIconProps extends ComponentPropsWithoutRef<'svg'> {
	network: SocialNetworks
}

const NAME = 'SocialIcon'
export const SocialIcon = forwardRef<SVGSVGElement, SocialIconProps>(
	({ network, ...props }: SocialIconProps, ref) => {
		if (IconMap.has(network)) {
			// biome-ignore lint/style/useNamingConvention: do not rename the Icon will be a React component
			// biome-ignore lint/style/noNonNullAssertion:  we are already checking if the key exists
			const Icon = IconMap.get(network)!
			const dataTestId = `${NAME}-${network}`
			return <Icon data-testid={dataTestId} ref={ref} {...props} />
		}
		throw new Error("couldn't find the social icon associated to the required network key")
	},
)
SocialIcon.displayName = NAME
