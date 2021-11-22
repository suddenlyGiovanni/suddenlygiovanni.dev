import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'
import styled from 'styled-components'

import { Footer, Header, Main, mdxComponents } from '../components'
import { navMobileCtx } from '../context'

const LayoutContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
`

export const Layout: React.FC = ({ children }) => {
  const { state: isMainDisabled } = React.useContext(navMobileCtx)
  return (
    <LayoutContainer>
      <Header />
      <MDXProvider components={mdxComponents}>
        <Main $disabled={isMainDisabled}>{children}</Main>
      </MDXProvider>
      <Footer />
    </LayoutContainer>
  )
}
