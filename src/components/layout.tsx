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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 18px;
    line-height: 1.4;

    /* remove margin for the main div that Gatsby mounts into */
    /* > div {
      margin-top: 0;
    } */
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
          min-height: 100vh;
        `}
      >
        <Header />
        <main
          css={css`
            margin: 2rem auto 4rem;
            max-width: 90vw;
            width: 550px;
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
