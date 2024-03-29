import { Icons } from '@/components/icons/icons.tsx'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

export const IconMap = new Map([
	['twitter', Icons.twitter],
	['github', Icons.gitHub],
	['linkedin', Icons.linkedin],
])
export type SocialNetworks = Parameters<(typeof IconMap)['get']>[number]

interface SocialIconProps extends ComponentPropsWithoutRef<'svg'> {
	network: SocialNetworks
}

const NAME = 'SocialIcon'
export const SocialIcon = forwardRef<SVGSVGElement, SocialIconProps>(
	({ network, ...props }: SocialIconProps, ref) => {
		// biome-ignore lint/style/useNamingConvention: this is a valid use case for a Map
		const Icon = IconMap.get(network)
		if (!Icon) {
			throw new Error(
				`Couldn't find key "${network}" in the IconMap. Available keys are: [${Array.from(
					IconMap.keys(),
				)
					.map(value => `"${value}"`)
					.join(', ')}]`,
			)
		}

		return <Icon data-testid={`${NAME}-${network}`} ref={ref} {...props} />
	},
)
SocialIcon.displayName = NAME
