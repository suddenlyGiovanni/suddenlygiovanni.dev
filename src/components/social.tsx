import React from 'react'
import styled from 'styled-components'

import { config } from '../../config/website'
import { SocialIcon } from './social-icon'

interface Props {
  color: string
  url: string
}

const SocialLinkStyled = styled.a<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ $color }) => $color};

  :hover {
    color: rgba(255, 255, 255, 1);
  }
`

export const Twitter: React.VFC<Partial<Props>> = ({
  color = `rgba(255, 255, 255, 0.7)`,
  url = config.twitter,
}) => (
  <SocialLinkStyled href={url} $color={color} aria-label="Visit my Twitter">
    <SocialIcon network="twitter" size={24} aria-label="Twitter icon" />
  </SocialLinkStyled>
)

export const LinkedIn: React.VFC<Partial<Props>> = ({
  color = `rgba(255, 255, 255, 0.7)`,
  url = config.linkedin,
}) => (
  <SocialLinkStyled href={url} $color={color} aria-label="Visit my LinkedIn">
    <SocialIcon network="linkedin" size={24} aria-label="LinkedIn icon" />
  </SocialLinkStyled>
)

export const GitHub: React.VFC<Partial<Props>> = ({
  color = `rgba(255, 255, 255, 0.7)`,
  url = config.github,
}) => (
  <SocialLinkStyled href={url} $color={color} aria-label="Visit my GitHub">
    <SocialIcon network="github" size={24} aria-label="GitHub icon" />
  </SocialLinkStyled>
)
