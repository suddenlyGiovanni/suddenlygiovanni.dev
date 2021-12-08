import { Layout } from '@layouts/index'
import GlobalStyles from '@lib/global-styles'

import type { GatsbyBrowser } from 'gatsby'

export const RootWrapper: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => (
  <>
    <GlobalStyles />
    <Layout {...props}>{element}</Layout>
  </>
)
