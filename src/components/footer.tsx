import { css } from '@emotion/core'
import React from 'react'

import { Container } from './container'
import { GitHub, LinkedIn, Twitter } from './social'

type Props = {
  maxWidth?: number
}

export const Footer = ({ maxWidth = 720 }: Props): JSX.Element => (
  <footer
    css={css`
      position: relative;

      flex-shrink: 0;
      width: 100%;
    `}
  >
    <Container
      maxWidth={maxWidth}
      css={css`
        display: flex;
        flex-flow: row wrap;
        align-content: space-between;
      `}
    >
      <p
        css={css`
          flex: 1 auto;
          margin-top: 1rem;

          /* unset default margin styles */
          margin-bottom: 0;
        `}
      >
        ©{' '}
        {
          // TODO: use the build year time
          new Date().getFullYear()
        }{' '}
        Giovanni Ravalico
      </p>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 120px;
          margin-top: 1rem;
        `}
      >
        <Twitter color="black" />
        <GitHub color="black" />
        <LinkedIn color="black" />
      </div>
    </Container>
  </footer>
)
