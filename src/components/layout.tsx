import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import React, { FC } from 'react'

import { globalStyles } from '../lib/global.styles'

import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'
import { mdxComponents } from './mdx'
import { SEO } from './seo'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
`

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <SEO />
      <Wrapper>
        <Header />
        <MDXProvider components={mdxComponents}>
          <Main>{children}</Main>
        </MDXProvider>
        <Footer />
      </Wrapper>
    </>
  )
}

export default Layout
