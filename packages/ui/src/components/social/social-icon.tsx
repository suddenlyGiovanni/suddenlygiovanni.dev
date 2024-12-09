import type { ComponentPropsWithRef, FC } from 'react'

import { Icons } from '../icons/icons.tsx'

export const IconMap = new Map([
	['twitter', Icons.twitter],
	['github', Icons.gitHub],
	['linkedin', Icons.linkedin],
])
export type SocialNetworks = Parameters<(typeof IconMap)['get']>[number]

interface SocialIconProps extends ComponentPropsWithRef<'svg'> {
	network: SocialNetworks
}

const NAME = 'SocialIcon'
const SocialIcon: FC<SocialIconProps> = ({ network, ref, ...props }: SocialIconProps) => {
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

	return (
		<Icon
			data-testid={`${NAME}-${network}`}
			ref={ref}
			{...props}
		/>
	)
}
SocialIcon.displayName = NAME

export { SocialIcon }
