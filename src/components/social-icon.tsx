import { IconBaseProps } from 'react-icons'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const IconMap = new Map([
  ['twitter', FaTwitter],
  ['github', FaGithub],
  ['linkedin', FaLinkedin],
])

type Props = {
  network: string
} & IconBaseProps

export const SocialIcon = ({ network, ...props }: Props): JSX.Element => {
  const iconMapKey = network.toLowerCase()
  if (!IconMap.has(iconMapKey)) {
    throw new Error(
      "couldn't find the social icon associated to the required network key"
    )
  } else {
    const Icon = IconMap.get(iconMapKey)
    return Icon!(props)
  }
}
