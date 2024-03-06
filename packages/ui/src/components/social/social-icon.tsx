import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { Icons } from '../icons/icons.tsx'

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
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we are already checking if the key exists
			const Icon = IconMap.get(network)!
			const dataTestId = `${NAME}-${network}`
			return <Icon data-testid={dataTestId} ref={ref} {...props} />
		}
		throw new Error("couldn't find the social icon associated to the required network key")
	},
)
SocialIcon.displayName = NAME
