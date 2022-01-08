import type { GatsbyBrowser } from 'gatsby'

import { NavMobileProvider } from '../src/context'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => <NavMobileProvider>{element}</NavMobileProvider>
