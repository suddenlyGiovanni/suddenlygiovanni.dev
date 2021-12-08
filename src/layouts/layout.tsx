import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'
import styled from 'styled-components'

import { mdxComponents, SEOBase } from '@components/index'
import { navMobileCtx } from '@context/index'
import { Footer } from '@layouts/footer'
import { Header } from '@layouts/header'
import { Main } from '@layouts/main'

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
    <>
      <SEOBase />
      <LayoutContainer>
        <Header />
        <MDXProvider components={mdxComponents}>
          <Main $disabled={isMainDisabled}>{children}</Main>
        </MDXProvider>
        <Footer />
      </LayoutContainer>
    </>
  )
}
