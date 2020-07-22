import { Global, css } from '@emotion/core'
import React, { FC } from 'react'

import { Header } from './header'
import { SEO } from './seo'

const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html,
  body {
    margin: 0;

    color: #555;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    line-height: 1.4;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #222;
    line-height: 1.1;

    + * {
      margin-top: 0.5rem;
    }
  }

  strong {
    color: #222;
  }

  li {
    margin-top: 0.25rem;
  }
`

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <SEO />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 320px;
          min-height: 100vh;
        `}
      >
        <Header />
        <main
          css={css`
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

// TODO: implement a footer
const Footer = (): JSX.Element => <div>footer</div>

export default Layout
