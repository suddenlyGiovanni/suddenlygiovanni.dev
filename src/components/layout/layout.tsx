import { Global, css } from '@emotion/core'
import React, { FC } from 'react'

import { Footer } from '../footer'
import { Header } from '../header'
import { SEO } from '../seo'

import { globalStyles } from './layout.styles'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <SEO />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 100%;
          min-width: 320px;
          min-height: 100vh;
        `}
      >
        <Header />
        <main
          css={css`
            flex-grow: 1;
            flex-shrink: 0;
            width: 550px;
            max-width: 90vw;
            margin: 2rem auto 4rem;
          `}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
