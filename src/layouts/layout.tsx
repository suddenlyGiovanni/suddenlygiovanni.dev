import { MDXProvider } from '@mdx-js/react'
import styled from 'styled-components'

import { Footer, Header, Main, mdxComponents } from '../components'

const LayoutContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
`

export const Layout: React.FC = ({ children }) => (
  <LayoutContainer>
    <Header />
    <MDXProvider components={mdxComponents}>
      <Main>{children}</Main>
    </MDXProvider>
    <Footer />
  </LayoutContainer>
)
