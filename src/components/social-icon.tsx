import type { IconBaseProps, IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

type SocialNetworks = 'twitter' | 'github' | 'linkedin'

export const IconMap: ReadonlyMap<SocialNetworks, IconType> = new Map([
  ['twitter', FaTwitter],
  ['github', FaGithub],
  ['linkedin', FaLinkedin],
] as const)

interface Props extends IconBaseProps {
  network: SocialNetworks
}

export const SocialIcon: React.VFC<Props> = ({ network, ...props }) => {
  const iconMapKey = network.toLowerCase() as SocialNetworks
  if (!IconMap.has(iconMapKey)) {
    throw new Error(
      "couldn't find the social icon associated to the required network key"
    )
  } else {
    const Icon = IconMap.get(iconMapKey)
    return Icon!(props)
  }
}
