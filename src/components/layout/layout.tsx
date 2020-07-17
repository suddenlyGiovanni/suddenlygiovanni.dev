import { Global } from '@emotion/core'
import React, { FC } from 'react'

import { Header } from '../header'
import { SEO } from '../seo'

import { global, main } from './layout.styles'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Global styles={global} />
      <SEO />
      <Header />
      <main css={main}>{children}</main>
    </>
  )
}

export default Layout
