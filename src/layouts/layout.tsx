import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'
import styled from 'styled-components'

import config from '../../config'
import { mdxComponents, SEOBase } from '../components'
import { navMobileCtx } from '../context'
import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

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
      <SEOBase
        title={config.siteTitle}
        titleTemplate={config.siteTitleTemplate}
        description={config.siteDescription}
        url={config.siteUrl}
        author={config.author}
        creator={[config.author]}
        siteLanguage={config.siteLocale}
        keywords={config.siteKeywords}
        colorScheme={'only light'}
        publisher={config.publisher}
        robots={['index']}
        googlebot={['index']}
        generator={config.generator}
      />
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
