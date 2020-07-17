import { Global } from '@emotion/core'
import React, { FC } from 'react'

import { Header, SEO } from '..'

import { global, main } from './layout.styles'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Global styles={global} />
      <SEO />
      <Header />
      <main css={main}>{children}</main>
    </>
  )
}
