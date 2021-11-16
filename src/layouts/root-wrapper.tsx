import type { GatsbyBrowser } from 'gatsby'

import GlobalStyles from '../lib/global-styles'
import { Layout } from './layout'

export const RootWrapper: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => (
  <>
    <GlobalStyles />
    <Layout {...props}>{element}</Layout>
  </>
)
