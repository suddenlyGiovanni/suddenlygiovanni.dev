import { css } from '@emotion/core'
import React from 'react'

import { bpMaxSM } from '../lib/breakpoints'

import { Container } from './container'
import { GitHub, LinkedIn, Twitter } from './social'

const footerStyles = css`
  position: relative;

  flex-shrink: 0;
  width: 100%;

  border-top: thin solid black;
`
const containerStyles = css`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  padding-bottom: 1rem;
  ${bpMaxSM} {
    padding-bottom: 1rem;
  }
`
const copyrightStyles = css`
  flex: 1 auto;
  margin-top: 1rem;
  margin-bottom: 0;
`

const socialsStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 120px;
  margin-top: 1rem;
`

type Props = {
  maxWidth?: number
}
export const Footer = ({ maxWidth = 720 }: Props): JSX.Element => {
  const copyrightYear = new Date().getFullYear() // TODO: use the build year time
  return (
    <footer css={footerStyles}>
      <Container maxWidth={maxWidth} css={containerStyles} noVerticalPadding>
        <p css={copyrightStyles}>© {copyrightYear} Giovanni Ravalico</p>
        <address css={socialsStyles}>
          <Twitter color="black" />
          <GitHub color="black" />
          <LinkedIn color="black" />
        </address>
      </Container>
    </footer>
  )
}
