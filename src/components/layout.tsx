import { Global, css } from '@emotion/core'
import React, { FC } from 'react'

import { globalStyles } from '../lib/global.styles'
// import { reset } from '../lib/reset.styles'

import { Footer } from './footer'
import { Header } from './header'
import { SEO } from './seo'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <Global styles={reset} /> */}
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
