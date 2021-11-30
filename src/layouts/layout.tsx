import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'
import styled from 'styled-components'
import config from '../../config/config'

import { Footer, Header, Main, mdxComponents, SEOBase } from '../components'
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
      <SEOBase
        title={config.siteTitle}
        titleTemplate={config.siteTitleTemplate}
        description={config.siteDescription}
        url={config.siteUrl}
        author={config.author}
        creator={[config.author]}
        siteLanguage={config.siteLocale}
        keywords={config.keywords}
        colorScheme={'only light'}
        publisher={config.publisher}
        robots={['index']}
        googlebot={['index']}
        generator={config.generator}
      />
      <Header />
      <MDXProvider components={mdxComponents}>
        <Main $disabled={isMainDisabled}>{children}</Main>
      </MDXProvider>
      <Footer />
    </LayoutContainer>
  )
}
