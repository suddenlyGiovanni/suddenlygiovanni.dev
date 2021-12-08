import styled from 'styled-components'

import config from '@config/index'
import { SocialIcon } from './social-icon'

const SocialLink = styled.a<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ $color }) => $color};

  :hover {
    color: hsla(0, 0%, 0%, 0.7);
  }
`

const { twitter, linkedin, github } = config

interface Props {
  color: string
  url: string
}

const defaultColor = `hsl(0, 0%, 0%)` as const

export const Twitter: React.VFC<Partial<Props>> = ({
  color = defaultColor,
  url = twitter.url + twitter.handle,
}) => (
  <SocialLink
    href={url}
    target={'_blank'}
    $color={color}
    aria-label="Visit my Twitter"
  >
    <SocialIcon network="twitter" size={24} aria-label="Twitter icon" />
  </SocialLink>
)

export const LinkedIn: React.VFC<Partial<Props>> = ({
  color = defaultColor,
  url = linkedin.url + linkedin.user,
}) => (
  <SocialLink
    href={url}
    target={'_blank'}
    $color={color}
    aria-label="Visit my LinkedIn"
  >
    <SocialIcon network="linkedin" size={24} aria-label="LinkedIn icon" />
  </SocialLink>
)

export const GitHub: React.VFC<Partial<Props>> = ({
  color = defaultColor,
  url = github.url + github.user,
}) => (
  <SocialLink
    href={url}
    target={'_blank'}
    $color={color}
    aria-label="Visit my GitHub"
  >
    <SocialIcon network="github" size={24} aria-label="GitHub icon" />
  </SocialLink>
)
