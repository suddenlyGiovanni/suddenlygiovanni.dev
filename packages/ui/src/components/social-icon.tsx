import type { IconBaseProps, IconType } from 'react-icons'
import type { JSX } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export type SocialNetworks = 'twitter' | 'github' | 'linkedin'

export const IconMap = new Map<SocialNetworks, IconType>([
	['twitter', FaTwitter],
	['github', FaGithub],
	['linkedin', FaLinkedin],
] as const)

interface Props extends IconBaseProps {
	network: SocialNetworks
}

export function SocialIcon({ network, ...props }: Props): JSX.Element {
	const iconMapKey = network.toLowerCase() as SocialNetworks
	if (!IconMap.has(iconMapKey)) {
		throw new Error("couldn't find the social icon associated to the required network key")
	} else {
		return IconMap.get(iconMapKey)!(props)
	}
}
