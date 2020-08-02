import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import React, { FC } from 'react'

import { globalStyles } from '../../lib/global.styles'

import { mdxComponents } from '../mdx'

import { SEO } from '../seo/seo'

import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
`

type Props = {
  customSEO?: boolean
}

export const Layout: FC<Props> = ({ children, customSEO = false }) => {
  return (
    <>
      <Global styles={globalStyles} />
      {!customSEO && <SEO />}
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
