import { MDXProvider } from '@mdx-js/react'
import * as React from 'react'

import { Header, Main, mdxComponents } from '../components'
import { Footer } from '../components/footer'
import * as layoutStyles from './layout.module.css'

export const Layout: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  children,
  ...layoutWrapperProps
}) => (
  <div {...layoutWrapperProps} className={layoutStyles.container}>
    <Header />
    <MDXProvider components={mdxComponents}>
      <Main>{children}</Main>
    </MDXProvider>
    <Footer />
  </div>
)
