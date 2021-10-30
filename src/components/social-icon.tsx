import * as React from 'react'
import type { IconBaseProps, IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export type SocialNetworks = 'twitter' | 'github' | 'linkedin'

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
    return IconMap.get(iconMapKey)!(props)
  }
}
