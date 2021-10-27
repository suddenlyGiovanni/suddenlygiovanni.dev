import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import { mdxComponents, SEO } from '../components'

import GlobalStyles from '../lib/global-styles'
import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

/**
 * FIXME: find a more descriptive name
 */
const DivStyled: StyledComponent<'div', any, {}, never> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
`

interface Props {
  customSEO?: boolean
}

export const Layout: React.FC<Props> = ({ children, customSEO = false }) => (
  <>
    <GlobalStyles />
    {!customSEO && <SEO />}
    <DivStyled>
      <Header />
      <MDXProvider components={mdxComponents}>
        <Main>{children}</Main>
      </MDXProvider>
      <Footer />
    </DivStyled>
  </>
)
